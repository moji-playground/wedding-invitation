"use client";

import { useState, useEffect, useRef } from "react";
import { Copy, Check, ChevronDown, ChevronUp } from "lucide-react";

interface AccountInfo {
  relation: string;
  bank: string;
  number: string;
  holder: string;
}

const groomAccounts: AccountInfo[] = [
  { relation: "신랑", bank: "신한", number: "110531015046", holder: "정현모" },
  {
    relation: "신랑 아버지",
    bank: "농협",
    number: "3123566978511",
    holder: "정원봉",
  },
  {
    relation: "신랑 어머니",
    bank: "국민",
    number: "67470104276652",
    holder: "임금미",
  },
];

const brideAccounts: AccountInfo[] = [
  {
    relation: "신부",
    bank: "국민",
    number: "107010558441",
    holder: "김은지",
  },
  {
    relation: "신부 아버지",
    bank: "국민",
    number: "107240210605",
    holder: "김태훈",
  },
  {
    relation: "신부 어머니",
    bank: "국민",
    number: "111240294031",
    holder: "박인숙",
  },
];

export function AccountSection() {
  const [groomOpen, setGroomOpen] = useState(false);
  const [brideOpen, setBrideOpen] = useState(false);
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
        <h2 className="font-serif text-lg tracking-wide text-primary font-medium">
          마음 전하실 곳
        </h2>

        <p className="text-sm text-muted-foreground text-center leading-relaxed max-w-xs">
          참석이 어려우신 분들을 위해
          <br />
          계좌번호를 안내드립니다.
        </p>

        <div className="w-full max-w-sm flex flex-col gap-3">
          {/* Groom side */}
          <div className="bg-card rounded-2xl border border-border/50 shadow-sm overflow-hidden">
            <button
              onClick={() => setGroomOpen(!groomOpen)}
              className="w-full flex items-center justify-between px-6 py-4 text-sm font-medium text-foreground"
            >
              <span>신랑측 계좌번호</span>
              {groomOpen ? (
                <ChevronUp className="w-4 h-4 text-muted-foreground" />
              ) : (
                <ChevronDown className="w-4 h-4 text-muted-foreground" />
              )}
            </button>
            <div
              className={`overflow-hidden transition-all duration-500 ease-in-out ${
                groomOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
              }`}
            >
              <div className="px-6 pb-4 flex flex-col gap-3">
                {groomAccounts.map((account) => (
                  <AccountRow key={account.relation} account={account} />
                ))}
              </div>
            </div>
          </div>

          {/* Bride side */}
          <div className="bg-card rounded-2xl border border-border/50 shadow-sm overflow-hidden">
            <button
              onClick={() => setBrideOpen(!brideOpen)}
              className="w-full flex items-center justify-between px-6 py-4 text-sm font-medium text-foreground"
            >
              <span>신부측 계좌번호</span>
              {brideOpen ? (
                <ChevronUp className="w-4 h-4 text-muted-foreground" />
              ) : (
                <ChevronDown className="w-4 h-4 text-muted-foreground" />
              )}
            </button>
            <div
              className={`overflow-hidden transition-all duration-500 ease-in-out ${
                brideOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
              }`}
            >
              <div className="px-6 pb-4 flex flex-col gap-3">
                {brideAccounts.map((account) => (
                  <AccountRow key={account.relation} account={account} />
                ))}
              </div>
            </div>
          </div>
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
    <div className="flex items-center justify-between py-2 border-b border-border/30 last:border-0">
      <div>
        <p className="text-xs text-muted-foreground">{account.relation}</p>
        <p className="text-sm text-foreground mt-0.5">
          {account.bank} {account.number}
        </p>
        <p className="text-xs text-muted-foreground mt-0.5">{account.holder}</p>
      </div>
      <button
        onClick={handleCopy}
        className="shrink-0 w-8 h-8 rounded-full bg-secondary flex items-center justify-center text-secondary-foreground hover:bg-secondary/70 transition-colors"
        aria-label={`${account.bank} 계좌번호 복사`}
      >
        {copied ? (
          <Check className="w-3.5 h-3.5" />
        ) : (
          <Copy className="w-3.5 h-3.5" />
        )}
      </button>
    </div>
  );
}
