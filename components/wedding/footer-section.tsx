import Image from "next/image";

export function FooterSection() {
  return (
    <footer className="flex flex-col items-center gap-4 px-6 pt-1 pb-12">
      <div className="w-80 h-12 relative opacity-60">
        <Image
          src="/images/floral-divider.jpg"
          alt=""
          fill
          className="object-contain"
        />
      </div>
      <p className="font-serif text-sm text-muted-foreground/60 tracking-wider">
        현모 & 은지
      </p>
    </footer>
  );
}
