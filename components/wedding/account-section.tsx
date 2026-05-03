"use client";

import { useState, useEffect, useRef } from "react";
import { Copy, Check, ChevronDown } from "lucide-react";

interface AccountInfo {
  relation: string;
  bank: string;
  number: string;
  holder: string;
}

const groomAccounts: AccountInfo[] = [
  {
    relation: "신랑",
    bank: "신한은행",
    number: "110531015046",
    holder: "정현모",
  },
  {
    relation: "신랑 아버지",
    bank: "농협은행",
    number: "3123566978511",
    holder: "정원봉",
  },
  {
    relation: "신랑 어머니",
    bank: "국민은행",
    number: "67470104276652",
    holder: "임금미",
  },
];

const brideAccounts: AccountInfo[] = [
  {
    relation: "신부",
    bank: "국민은행",
    number: "107010558441",
    holder: "김은지",
  },
  {
    relation: "신부 아버지",
    bank: "국민은행",
    number: "107240210605",
    holder: "김태훈",
  },
  {
    relation: "신부 어머니",
    bank: "국민은행",
    number: "111240294031",
    holder: "박인숙",
  },
];

interface AccordionCardProps {
  title: string;
  accounts: AccountInfo[];
}

function AccordionCard({ title, accounts }: AccordionCardProps) {
  const [open, setOpen] = useState(false);

  return (
    <div className="overflow-hidden border border-border/60">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-5 py-4"
      >
        <span className="text-sm font-medium tracking-wide text-foreground">
          {title}
        </span>
        <ChevronDown
          className={`w-4 h-4 text-muted-foreground transition-transform duration-300 ${open ? "rotate-180" : ""}`}
        />
      </button>

      <div
        className={`grid transition-all duration-500 ease-in-out ${open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}
      >
        <div className="overflow-hidden">
          <div className="px-5 pb-5 flex flex-col gap-0 divide-y divide-border/30">
            {accounts.map((account) => (
              <AccountRow key={account.relation} account={account} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export function AccountSection() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("opacity-100", "translate-y-0");
          entry.target.classList.remove("opacity-0", "translate-y-6");
        }
      },
      { threshold: 0.2 },
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="px-6 py-16">
      <div
        ref={ref}
        className="flex flex-col items-center gap-8 opacity-0 translate-y-6 transition-all duration-1000 ease-out"
      >
        <div className="flex flex-col items-center gap-1">
          <p className="text-xs tracking-[0.3em] text-muted-foreground uppercase">
            Account
          </p>
          <h2 className="font-serif text-xl tracking-wide text-foreground font-medium">
            마음 전하실 곳
          </h2>
        </div>

        <p className="text-base text-muted-foreground text-center leading-relaxed">
          축하의 마음을 전해주시고 싶은 분들께
          <br />
          안내드립니다.
        </p>

        <div className="w-full max-w-sm flex flex-col gap-3">
          <AccordionCard title="신랑측 계좌번호" accounts={groomAccounts} />
          <AccordionCard title="신부측 계좌번호" accounts={brideAccounts} />
        </div>
      </div>
    </section>
  );
}

function AccountRow({ account }: { account: AccountInfo }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(account.number);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // fallback for unsupported browsers
    }
  };

  return (
    <div className="flex items-center justify-between py-3.5">
      <div className="flex flex-col gap-0.5">
        <p className="text-xs text-muted-foreground tracking-wide">
          {account.relation}
        </p>
        <p className="text-base font-medium text-foreground">
          {account.holder}
        </p>
        <p className="text-sm text-muted-foreground">
          {account.bank} {account.number}
        </p>
      </div>
      <button
        onClick={handleCopy}
        className="shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-border/60 text-xs text-muted-foreground hover:border-foreground/30 hover:text-foreground transition-colors"
        aria-label={`${account.bank} 계좌번호 복사`}
      >
        {copied ? (
          <>
            <Check className="w-3 h-3" />
            <span>복사됨</span>
          </>
        ) : (
          <>
            <Copy className="w-3 h-3" />
            <span>복사</span>
          </>
        )}
      </button>
    </div>
  );
}
