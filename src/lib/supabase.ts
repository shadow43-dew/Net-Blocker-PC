import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Storage bucket names
export const STORAGE_BUCKETS = {
  VIDEOS: 'videos',
  THUMBNAILS: 'thumbnails',
} as const;

// Helper function to get signed URL for video playback
export async function getVideoUrl(path: string) {
  const { data } = await supabase.storage
    .from(STORAGE_BUCKETS.VIDEOS)
    .createSignedUrl(path, 3600); // 1 hour expiry

  return data?.signedUrl;
}

// Helper function to get thumbnail URL
export function getThumbnailUrl(path: string) {
  return supabase.storage
    .from(STORAGE_BUCKETS.THUMBNAILS)
    .getPublicUrl(path).data.publicUrl;
}

// Upload helpers
export async function uploadVideo(file: File, userId: string) {
  const fileExt = file.name.split('.').pop();
  const fileName = `${userId}/${Date.now()}.${fileExt}`;

  const { data, error } = await supabase.storage
    .from(STORAGE_BUCKETS.VIDEOS)
    .upload(fileName, file);

  if (error) throw error;
  return data.path;
}

export async function uploadThumbnail(file: File, userId: string) {
  const fileExt = file.name.split('.').pop();
  const fileName = `${userId}/${Date.now()}.${fileExt}`;

  const { data, error } = await supabase.storage
    .from(STORAGE_BUCKETS.THUMBNAILS)
    .upload(fileName, file);

  if (error) throw error;
  return data.path;
}

// Video operations
export async function createVideo({
  title,
  description,
  category,
  videoPath,
  thumbnailPath,
  userId,
}: {
  title: string;
  description: string;
  category: string;
  videoPath: string;
  thumbnailPath: string;
  userId: string;
}) {
  const { data, error } = await supabase
    .from('videos')
    .insert({
      title,
      description,
      category,
      video_url: videoPath,
      thumbnail_url: thumbnailPath,
      user_id: userId,
    })
    .select()
    .single();

  if (error) throw error;
  return data;
}

// Like operations
export async function toggleVideoLike(videoId: string, userId: string) {
  const { data: existingLike } = await supabase
    .from('video_likes')
    .select()
    .eq('video_id', videoId)
    .eq('user_id', userId)
    .single();

  if (existingLike) {
    const { error } = await supabase
      .from('video_likes')
      .delete()
      .eq('video_id', videoId)
      .eq('user_id', userId);

    if (error) throw error;
    return false; // Unliked
  } else {
    const { error } = await supabase
      .from('video_likes')
      .insert({ video_id: videoId, user_id: userId });

    if (error) throw error;
    return true; // Liked
  }
}

// Comment operations
export async function addComment(videoId: string, userId: string, content: string) {
  const { data, error } = await supabase
    .from('comments')
    .insert({
      video_id: videoId,
      user_id: userId,
      content,
    })
    .select()
    .single();

  if (error) throw error;
  return data;
}

// View counter
export async function incrementViews(videoId: string) {
  const { error } = await supabase.rpc('increment_views', { video_id: videoId });
  if (error) throw error;
}