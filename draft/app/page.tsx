import { HeroSection } from "@/components/wedding/hero-section"
import { GreetingSection } from "@/components/wedding/greeting-section"
import { GallerySection } from "@/components/wedding/gallery-section"
import { CalendarSection } from "@/components/wedding/calendar-section"
import { LocationSection } from "@/components/wedding/location-section"
import { PhotoboothSection } from "@/components/wedding/photobooth-section"
import { AccountSection } from "@/components/wedding/account-section"

import { ShareSection } from "@/components/wedding/share-section"
import { FooterSection } from "@/components/wedding/footer-section"
import { SectionDivider } from "@/components/wedding/section-divider"

export default function WeddingInvitationPage() {
  return (
    <main className="min-h-screen bg-background max-w-lg mx-auto">
      <HeroSection />
      <SectionDivider />
      <GreetingSection />
      <SectionDivider />
      <GallerySection />
      <SectionDivider />
      <CalendarSection />
      <SectionDivider />
      <LocationSection />
      <SectionDivider />
      <PhotoboothSection />
      <SectionDivider />
      <AccountSection />
      <SectionDivider />
      <ShareSection />
      <FooterSection />
    </main>
  )
}
