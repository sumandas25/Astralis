-- Profiles table for forum identity
CREATE TABLE public.profiles (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL UNIQUE REFERENCES auth.users(id) ON DELETE CASCADE,
  username TEXT NOT NULL UNIQUE,
  avatar_url TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  CONSTRAINT username_format CHECK (char_length(username) BETWEEN 3 AND 30 AND username ~ '^[a-zA-Z0-9_]+$')
);

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Profiles are viewable by everyone"
  ON public.profiles FOR SELECT USING (true);

CREATE POLICY "Users can insert own profile"
  ON public.profiles FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own profile"
  ON public.profiles FOR UPDATE USING (auth.uid() = user_id);

-- Forum topics
CREATE TABLE public.forum_topics (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  body TEXT NOT NULL,
  category TEXT NOT NULL DEFAULT 'general',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.forum_topics ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Topics viewable by everyone"
  ON public.forum_topics FOR SELECT USING (true);
CREATE POLICY "Authenticated users can create topics"
  ON public.forum_topics FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Authors can update own topics"
  ON public.forum_topics FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Authors can delete own topics"
  ON public.forum_topics FOR DELETE USING (auth.uid() = user_id);

-- Forum replies
CREATE TABLE public.forum_replies (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  topic_id UUID NOT NULL REFERENCES public.forum_topics(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  body TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.forum_replies ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Replies viewable by everyone"
  ON public.forum_replies FOR SELECT USING (true);
CREATE POLICY "Authenticated users can reply"
  ON public.forum_replies FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Authors can update own replies"
  ON public.forum_replies FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Authors can delete own replies"
  ON public.forum_replies FOR DELETE USING (auth.uid() = user_id);

-- Timestamp trigger
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

CREATE TRIGGER trg_profiles_updated BEFORE UPDATE ON public.profiles
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER trg_topics_updated BEFORE UPDATE ON public.forum_topics
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Auto-create a profile on signup (username derived from metadata or email)
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
DECLARE
  base_name TEXT;
  candidate TEXT;
  suffix INT := 0;
BEGIN
  base_name := COALESCE(
    NULLIF(regexp_replace(COALESCE(NEW.raw_user_meta_data->>'username', NEW.raw_user_meta_data->>'preferred_username', NEW.raw_user_meta_data->>'name', split_part(NEW.email, '@', 1)), '[^a-zA-Z0-9_]', '', 'g'), ''),
    'user'
  );
  base_name := substr(base_name, 1, 24);
  IF char_length(base_name) < 3 THEN base_name := base_name || '_user'; END IF;
  candidate := base_name;
  WHILE EXISTS (SELECT 1 FROM public.profiles WHERE username = candidate) LOOP
    suffix := suffix + 1;
    candidate := substr(base_name, 1, 24) || suffix::text;
  END LOOP;
  INSERT INTO public.profiles (user_id, username) VALUES (NEW.id, candidate);
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Indexes
CREATE INDEX idx_topics_created ON public.forum_topics(created_at DESC);
CREATE INDEX idx_replies_topic ON public.forum_replies(topic_id, created_at);