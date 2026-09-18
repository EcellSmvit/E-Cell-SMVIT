import React from "react";
import { ArrowUpRight, Mail, Phone } from "lucide-react";

function Facingtrouble() {
  return (
    <section className="relative w-full overflow-hidden bg-[#111111] px-5 py-16 text-white sm:px-10 sm:py-24">
      <div className="mx-auto max-w-6xl">
        <div className="mb-10 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="h-2 w-2 rounded-full bg-[#6D4CFF]" />
            <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#888888]">
              We're Here To Help
            </span>
          </div>
          <span className="hidden text-[10px] font-semibold tracking-widest text-[#666666] sm:block">
            04 / 04
          </span>
        </div>
        <div className="grid gap-8 md:grid-cols-2 md:items-end">
          <div>
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-[#999999]">
              Facing an issue?
            </p>
            <h1 className="text-5xl font-black uppercase leading-[0.9] tracking-[-0.05em] sm:text-6xl md:text-7xl">
              Need{" "}
              <span className="text-[#6D4CFF]">
                Help?
              </span>
            </h1>
          </div>
          <p className="max-w-md text-sm leading-relaxed text-[#999999] md:ml-auto">
            If you have any questions or face technical issues while filling
            out the recruitment form, our team is happy to help you out.
          </p>
        </div>
        <div className="my-10 h-px w-full bg-[#303030]" />
        <div className="grid gap-4 sm:grid-cols-2">
          <a
            href="mailto:ecellsmvit@gmail.com"
            className="group flex items-center justify-between rounded-2xl border border-[#292929] bg-white p-5 text-black transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_15px_40px_rgba(0,0,0,0.2)] sm:p-6"
          >
            <div className="flex items-center gap-4">
              <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#F1EFE9] transition-colors group-hover:bg-[#6D4CFF] group-hover:text-white">
                <Mail size={18} />
              </div>

              <div>
                <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-[#999791]">
                  Email Us
                </p>
                <p className="mt-1 text-sm font-bold sm:text-base">
                  ecellsmvit@gmail.com
                </p>
              </div>
            </div>
            <div className="flex h-9 w-9 items-center justify-center rounded-full border border-[#DDDAD2] transition-transform duration-300 group-hover:rotate-45">
              <ArrowUpRight size={15} />
            </div>
          </a>
          <a
            href="tel:+917903897660"
            className="group flex items-center justify-between rounded-2xl border border-[#292929] bg-white p-5 text-black transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_15px_40px_rgba(0,0,0,0.2)] sm:p-6"
          >
            <div className="flex items-center gap-4">
              <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#F1EFE9] transition-colors group-hover:bg-[#6D4CFF] group-hover:text-white">
                <Phone size={18} />
              </div>
              <div>
                <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-[#999791]">
                  Call Us
                </p>
                <p className="mt-1 text-sm font-bold sm:text-base">
                  +91 7903897660
                </p>
              </div>
            </div>
            <div className="flex h-9 w-9 items-center justify-center rounded-full border border-[#DDDAD2] transition-transform duration-300 group-hover:rotate-45">
              <ArrowUpRight size={15} />
            </div>
          </a>
        </div>
        <div className="mt-5 flex flex-col items-start justify-between gap-4 rounded-2xl bg-[#6D4CFF] px-6 py-5 text-white sm:flex-row sm:items-center sm:px-7">
          <p className="text-xs font-medium">
            Still have questions? Don't hesitate to reach out.
          </p>
          <span className="flex items-center gap-2 text-[9px] font-bold uppercase tracking-[0.2em]">
            E-CELL SMVIT
            <span className="h-1.5 w-1.5 rounded-full bg-white" />
          </span>
        </div>
      </div>
      <div className="pointer-events-none absolute -bottom-8 right-4 select-none text-[6rem] font-black uppercase leading-none tracking-[-0.08em] text-white/[0.025] sm:right-10 sm:text-[10rem]">
        HELP
      </div>
    </section>
  );
}
export default Facingtrouble;