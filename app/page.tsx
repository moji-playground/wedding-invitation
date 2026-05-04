import { HeroSection } from "@/components/wedding/hero-section";
import { BackgroundEffects } from "@/components/wedding/background-effects";
import { GreetingSection } from "@/components/wedding/greeting-section";
import { GallerySectionD } from "@/components/wedding/gallery-section-d";
import { CalendarSection } from "@/components/wedding/calendar-section";
import { LocationSection } from "@/components/wedding/location-section";
import { PhotoboothSection } from "@/components/wedding/photobooth-section";
import { AccountSection } from "@/components/wedding/account-section";
import { ShareSection } from "@/components/wedding/share-section";
import { FooterSection } from "@/components/wedding/footer-section";
import { MusicPlayer } from "@/components/wedding/music-player";

export default function WeddingInvitationPage() {
  return (
    <main className="min-h-screen bg-background max-w-lg mx-auto relative overflow-hidden">
      <BackgroundEffects />
      <HeroSection />
      <GreetingSection />
      <GallerySectionD />
      <CalendarSection />
      <LocationSection />
      <PhotoboothSection />
      <AccountSection />
      <ShareSection />
      <FooterSection />
      <MusicPlayer />
    </main>
  );
}
