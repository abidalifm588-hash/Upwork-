import { useState } from "react";
import Logo from "./components/Logo";

type Plan = {
  id: "basic" | "plus";
  name: string;
  price: number;
  subtotal: string;
  tagline: string;
  benefits: string[];
  featured?: boolean;
};

const plans: Plan[] = [
  {
    id: "basic",
    name: "Basic",
    price: 20,
    subtotal: "19.99",
    tagline: "Everything you need to get started.",
    benefits: ["Normal delivery", "Limited access to talk with the agent", "Standard project support"],
  },
  {
    id: "plus",
    name: "Plus",
    price: 40,
    subtotal: "39.99",
    tagline: "Priority service for serious projects.",
    benefits: ["Fast delivery", "Full access to talk with the agent", "Priority project support"],
    featured: true,
  },
];

const Check = () => (
  <svg className="mt-0.5 h-5 w-5 flex-none text-[#14a800]" viewBox="0 0 20 20" fill="currentColor">
    <path
      fillRule="evenodd"
      d="M16.7 5.3a1 1 0 010 1.4l-7.5 7.5a1 1 0 01-1.4 0L3.3 9.7a1 1 0 111.4-1.4l3.8 3.8 6.8-6.8a1 1 0 011.4 0z"
      clipRule="evenodd"
    />
  </svg>
);

const inputCls =
  "w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-900 placeholder-slate-400 outline-none transition focus:border-[#14a800] focus:ring-4 focus:ring-[#14a800]/15";

export default function App() {
  const [step, setStep] = useState<"plans" | "payment" | "done">("plans");
  const [selected, setSelected] = useState<Plan | null>(null);
  const [showSummary, setShowSummary] = useState(false);
  const [promo, setPromo] = useState("");
  const [card, setCard] = useState({ number: "", exp: "", cvv: "", name: "" });
  const [error, setError] = useState("");

  const hire = (p: Plan) => {
    setSelected(p);
    setPromo("");
    setShowSummary(true);
  };

  const pay = () => {
    setShowSummary(false);
    setStep("payment");
    window.scrollTo({ top: 0 });
  };

  const reset = () => {
    setStep("plans");
    setSelected(null);
    setCard({ number: "", exp: "", cvv: "", name: "" });
    setError("");
    window.scrollTo({ top: 0 });
  };

  const proceed = (e: React.FormEvent) => {
    e.preventDefault();
    if (card.number.replace(/\s/g, "").length < 12) return setError("Please enter a valid card number.");
    if (!/^\d{2}\/\d{2}$/.test(card.exp)) return setError("Expiration date must be in MM/YY format.");
    if (card.cvv.length < 3) return setError("Please enter a valid CVV.");
    if (!card.name.trim()) return setError("Please enter the cardholder name.");
    setError("");
    setStep("done");
    window.scrollTo({ top: 0 });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-emerald-50 via-white to-slate-50 text-slate-900">
      <header className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
        <button onClick={reset} aria-label="Upwork home">
          <Logo className="h-7" />
        </button>
        <span className="hidden rounded-full border border-emerald-200 bg-white px-3 py-1 text-xs font-medium text-emerald-700 sm:inline">
          Trusted by millions of businesses
        </span>
      </header>

      <main className="mx-auto max-w-6xl px-6 pb-20">
        {step === "plans" && (
          <>
            <section className="pb-12 pt-6 text-center">
              <h1 className="text-4xl font-extrabold tracking-tight sm:text-6xl">Agent Plans</h1>
              <p className="mx-auto mt-4 max-w-xl text-lg text-slate-600">
                Choose the plan that fits your project and hire an Upwork agent today.
              </p>
            </section>

            <div className="mx-auto grid max-w-3xl gap-8 md:grid-cols-2">
              {plans.map((p) => (
                <div
                  key={p.id}
                  className={`relative flex flex-col rounded-3xl bg-white p-8 shadow-xl transition hover:-translate-y-1 ${
                    p.featured ? "border-2 border-[#14a800] shadow-emerald-200" : "border border-slate-200 shadow-slate-200/70"
                  }`}
                >
                  {p.featured && (
                    <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-[#14a800] px-4 py-1 text-xs font-semibold uppercase tracking-wide text-white">
                      Most popular
                    </span>
                  )}
                  <h2 className="text-xl font-bold">{p.name}</h2>
                  <p className="mt-1 text-sm text-slate-500">{p.tagline}</p>
                  <div className="mt-6 flex items-baseline gap-1">
                    <span className="text-5xl font-extrabold">${p.price}</span>
                  </div>
                  <ul className="my-8 flex-1 space-y-4">
                    {p.benefits.map((b) => (
                      <li key={b} className="flex gap-3 text-slate-700">
                        <Check />
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                  <button
                    onClick={() => hire(p)}
                    className={`w-full rounded-full px-6 py-3.5 text-base font-semibold transition ${
                      p.featured
                        ? "bg-[#14a800] text-white hover:bg-[#108a00]"
                        : "border-2 border-[#14a800] text-[#14a800] hover:bg-emerald-50"
                    }`}
                  >
                    Hire
                  </button>
                </div>
              ))}
            </div>
          </>
        )}

        {step === "payment" && selected && (
          <section className="mx-auto max-w-xl pt-6">
            <button onClick={() => setStep("plans")} className="mb-4 text-sm font-medium text-[#14a800] hover:underline">
              ← Back to plans
            </button>
            <form onSubmit={proceed} className="rounded-3xl border border-slate-200 bg-white p-8 shadow-xl">
              <h1 className="text-3xl font-extrabold">Payment</h1>
              <div className="mt-4 flex items-start gap-3 rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-900">
                <svg className="mt-0.5 h-5 w-5 flex-none" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                </svg>
                <p>
                  <strong>A dual-currency card is required</strong> to complete this payment.
                </p>
              </div>

              <div className="mt-4 flex justify-between text-sm text-slate-600">
                <span>{selected.name} plan</span>
                <span className="font-semibold text-slate-900">${selected.subtotal}</span>
              </div>

              <div className="mt-6 space-y-4">
                <div>
                  <label className="mb-1.5 block text-sm font-medium">Card Number</label>
                  <input
                    className={inputCls}
                    inputMode="numeric"
                    placeholder="1234 5678 9012 3456"
                    maxLength={19}
                    value={card.number}
                    onChange={(e) =>
                      setCard({
                        ...card,
                        number: e.target.value.replace(/\D/g, "").slice(0, 16).replace(/(.{4})/g, "$1 ").trim(),
                      })
                    }
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="mb-1.5 block text-sm font-medium">Expiration Date</label>
                    <input
                      className={inputCls}
                      inputMode="numeric"
                      placeholder="MM/YY"
                      maxLength={5}
                      value={card.exp}
                      onChange={(e) => {
                        const d = e.target.value.replace(/\D/g, "").slice(0, 4);
                        setCard({ ...card, exp: d.length > 2 ? `${d.slice(0, 2)}/${d.slice(2)}` : d });
                      }}
                    />
                  </div>
                  <div>
                    <label className="mb-1.5 block text-sm font-medium">CVV</label>
                    <input
                      className={inputCls}
                      inputMode="numeric"
                      type="password"
                      placeholder="123"
                      maxLength={4}
                      value={card.cvv}
                      onChange={(e) => setCard({ ...card, cvv: e.target.value.replace(/\D/g, "").slice(0, 4) })}
                    />
                  </div>
                </div>
                <div>
                  <label className="mb-1.5 block text-sm font-medium">Cardholder Name</label>
                  <input
                    className={inputCls}
                    placeholder="Name on card"
                    value={card.name}
                    onChange={(e) => setCard({ ...card, name: e.target.value })}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="mb-1.5 block text-sm font-medium">State</label>
                    <input className={inputCls} defaultValue="Savar" />
                  </div>
                  <div>
                    <label className="mb-1.5 block text-sm font-medium">Country</label>
                    <input className={inputCls} defaultValue="Bangladesh" />
                  </div>
                </div>
              </div>

              {error && <p className="mt-4 text-sm font-medium text-red-600">{error}</p>}

              <button
                type="submit"
                className="mt-8 w-full rounded-full bg-[#14a800] px-6 py-3.5 text-base font-semibold text-white transition hover:bg-[#108a00]"
              >
                Proceed
              </button>
            </form>
          </section>
        )}

        {step === "done" && (
          <section className="mx-auto max-w-xl pt-10 text-center">
            <div className="rounded-3xl border border-slate-200 bg-white p-10 shadow-xl">
              <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-emerald-100">
                <svg className="h-10 w-10 text-[#14a800]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={3} strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h1 className="mt-6 text-2xl font-extrabold">Payment received</h1>
              <p className="mt-3 text-lg text-slate-600">
                We have received your payment. An agent will contact you very soon.
              </p>
              <button
                onClick={reset}
                className="mt-8 rounded-full border-2 border-[#14a800] px-8 py-3 font-semibold text-[#14a800] transition hover:bg-emerald-50"
              >
                Back to home
              </button>
            </div>
          </section>
        )}
      </main>

      {showSummary && selected && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 p-4 backdrop-blur-sm"
          onClick={() => setShowSummary(false)}
        >
          <div
            className="w-full max-w-md rounded-3xl bg-white p-8 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
          >
            <div className="flex items-start justify-between">
              <h2 className="text-2xl font-extrabold">Summary</h2>
              <button
                onClick={() => setShowSummary(false)}
                className="rounded-full p-1 text-slate-400 hover:bg-slate-100 hover:text-slate-700"
                aria-label="Close"
              >
                <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round">
                  <path d="M6 6l12 12M18 6L6 18" />
                </svg>
              </button>
            </div>
            <div className="mt-5 flex items-center justify-between rounded-xl bg-slate-50 p-4">
              <span className="font-medium">{selected.name} plan</span>
              <span className="text-slate-500">${selected.price}</span>
            </div>
            <div className="mt-4 flex items-center justify-between">
              <span className="text-slate-600">Subtotal</span>
              <span className="text-right">
                <span className="text-2xl font-extrabold">${selected.subtotal}</span>
                <span className="block text-xs text-slate-500">(including tax)</span>
              </span>
            </div>
            <div className="mt-5">
              <label className="mb-1.5 block text-sm font-medium">Promo Code</label>
              <input
                className={inputCls}
                placeholder="Enter promo code"
                value={promo}
                onChange={(e) => setPromo(e.target.value)}
              />
            </div>
            <button
              onClick={pay}
              className="mt-8 w-full rounded-full bg-[#14a800] px-6 py-3.5 text-base font-semibold text-white transition hover:bg-[#108a00]"
            >
              Pay
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
