import React from 'react';
import Navbar from '../components/Navbar';
import UploadFilmForm from '../components/UploadFilmForm';
import Footer from '../components/Footer';

export default function UploadPage() {
  return (
    <div className="min-h-screen bg-notflix-black flex flex-col">
      <Navbar />
      
      <main className="flex-1 pt-24 pb-12 px-4">
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="space-y-2 text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground">
              Upload Your Film
            </h1>
            <p className="text-lg text-muted-foreground">
              Share your creative work with the Notflix community
            </p>
          </div>
          
          <div className="bg-card border border-border rounded-lg p-6 md:p-8">
            <UploadFilmForm />
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
