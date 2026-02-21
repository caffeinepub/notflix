import React, { useState } from 'react';
import { useNavigate } from '@tanstack/react-router';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Label } from './ui/label';
import { useUploadFilm, addFilmToList } from '../hooks/useQueries';
import { ExternalBlob } from '../backend';
import { Upload, Loader2, CheckCircle2 } from 'lucide-react';
import { useInternetIdentity } from '../hooks/useInternetIdentity';
import { Progress } from './ui/progress';

export default function UploadFilmForm() {
  const navigate = useNavigate();
  const { identity, login, loginStatus } = useInternetIdentity();
  const uploadFilm = useUploadFilm();
  
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [thumbnailFile, setThumbnailFile] = useState<File | null>(null);
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [thumbnailProgress, setThumbnailProgress] = useState(0);
  const [videoProgress, setVideoProgress] = useState(0);
  const [uploadSuccess, setUploadSuccess] = useState(false);

  const handleThumbnailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type.startsWith('image/')) {
      setThumbnailFile(file);
    }
  };

  const handleVideoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type.startsWith('video/')) {
      setVideoFile(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!identity) {
      login();
      return;
    }

    if (!title || !description || !thumbnailFile || !videoFile) {
      alert('Please fill in all fields');
      return;
    }

    try {
      setThumbnailProgress(0);
      setVideoProgress(0);

      const thumbnailBytes = new Uint8Array(await thumbnailFile.arrayBuffer());
      const videoBytes = new Uint8Array(await videoFile.arrayBuffer());

      const thumbnailBlob = ExternalBlob.fromBytes(thumbnailBytes).withUploadProgress(
        (percentage) => setThumbnailProgress(percentage)
      );
      
      const videoBlob = ExternalBlob.fromBytes(videoBytes).withUploadProgress(
        (percentage) => setVideoProgress(percentage)
      );

      await uploadFilm.mutateAsync({
        title,
        description,
        thumbnail: thumbnailBlob,
        video: videoBlob
      });

      // Add film to local list
      addFilmToList(identity.getPrincipal());

      setUploadSuccess(true);
      
      setTimeout(() => {
        navigate({ to: '/' });
      }, 2000);
    } catch (error) {
      console.error('Upload error:', error);
      alert('Failed to upload film. Please try again.');
    }
  };

  if (!identity && loginStatus !== 'logging-in') {
    return (
      <div className="max-w-2xl mx-auto space-y-6 text-center">
        <div className="space-y-2">
          <h2 className="text-2xl font-bold text-foreground">Login Required</h2>
          <p className="text-muted-foreground">
            You need to login to upload films to Notflix.
          </p>
        </div>
        <Button onClick={login} size="lg" className="bg-primary hover:bg-primary/90">
          Login to Upload
        </Button>
      </div>
    );
  }

  if (uploadSuccess) {
    return (
      <div className="max-w-2xl mx-auto space-y-6 text-center">
        <CheckCircle2 className="w-16 h-16 text-primary mx-auto" />
        <div className="space-y-2">
          <h2 className="text-2xl font-bold text-foreground">Upload Successful!</h2>
          <p className="text-muted-foreground">
            Your film has been uploaded to Notflix. Redirecting to home...
          </p>
        </div>
      </div>
    );
  }

  const isUploading = uploadFilm.isPending;
  const overallProgress = (thumbnailProgress + videoProgress) / 2;

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl mx-auto space-y-6">
      <div className="space-y-2">
        <Label htmlFor="title">Film Title *</Label>
        <Input
          id="title"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter film title"
          required
          disabled={isUploading}
          className="bg-card border-border"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Description *</Label>
        <Textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Enter film description"
          required
          disabled={isUploading}
          rows={4}
          className="bg-card border-border resize-none"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="thumbnail">Thumbnail Image *</Label>
        <div className="flex items-center gap-4">
          <Input
            id="thumbnail"
            type="file"
            accept="image/*"
            onChange={handleThumbnailChange}
            required
            disabled={isUploading}
            className="bg-card border-border"
          />
          {thumbnailFile && (
            <span className="text-sm text-muted-foreground">{thumbnailFile.name}</span>
          )}
        </div>
        {isUploading && thumbnailProgress > 0 && (
          <div className="space-y-1">
            <Progress value={thumbnailProgress} className="h-2" />
            <p className="text-xs text-muted-foreground">Thumbnail: {thumbnailProgress}%</p>
          </div>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="video">Video File *</Label>
        <div className="flex items-center gap-4">
          <Input
            id="video"
            type="file"
            accept="video/*"
            onChange={handleVideoChange}
            required
            disabled={isUploading}
            className="bg-card border-border"
          />
          {videoFile && (
            <span className="text-sm text-muted-foreground">{videoFile.name}</span>
          )}
        </div>
        {isUploading && videoProgress > 0 && (
          <div className="space-y-1">
            <Progress value={videoProgress} className="h-2" />
            <p className="text-xs text-muted-foreground">Video: {videoProgress}%</p>
          </div>
        )}
      </div>

      {isUploading && (
        <div className="space-y-2">
          <Progress value={overallProgress} className="h-3" />
          <p className="text-sm text-center text-muted-foreground">
            Uploading... {Math.round(overallProgress)}%
          </p>
        </div>
      )}

      <div className="flex gap-4 pt-4">
        <Button
          type="submit"
          disabled={isUploading}
          className="flex-1 bg-primary hover:bg-primary/90"
        >
          {isUploading ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Uploading...
            </>
          ) : (
            <>
              <Upload className="w-4 h-4 mr-2" />
              Upload Film
            </>
          )}
        </Button>
        <Button
          type="button"
          variant="outline"
          onClick={() => navigate({ to: '/' })}
          disabled={isUploading}
        >
          Cancel
        </Button>
      </div>
    </form>
  );
}
