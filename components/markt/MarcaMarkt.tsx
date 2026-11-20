"use client";

/**
 * Identidade fixa da Markt Saúde (fork FCcarv/deskcomm-markt).
 *
 * Estas peças ficam no CÓDIGO de propósito: não existe tela nem configuração
 * que as troque. A organização (clínica) pode pôr a logo dela no topo do menu;
 * a Markt Saúde continua no menu recolhido, no rodapé, na abertura e no login.
 *
 * Arquivos em public/markt/. Para trocar a arte, substitua os PNGs e gere a
 * imagem de novo.
 */

import * as React from "react";

import { cn } from "@/lib/utils";

export const MARKT_NOME = "Markt Saúde";
export const MARKT_LOGO = "/markt/logo.png";
export const MARKT_SIMBOLO = "/markt/simbolo.png";

export function SimboloMarkt({ className }: { className?: string }) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img src={MARKT_SIMBOLO} alt={MARKT_NOME} title={MARKT_NOME} className={cn("object-contain", className)} />
  );
}

export function LogoMarkt({ className }: { className?: string }) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img src={MARKT_LOGO} alt={MARKT_NOME} className={cn("w-auto object-contain", className)} />
  );
}

/** Assinatura fixa no rodapé do menu lateral. */
export function RodapeMarkt({ collapsed }: { collapsed: boolean }) {
  if (collapsed) {
    return (
      <div className="flex justify-center px-2 pt-2" data-markt-rodape="">
        <SimboloMarkt className="h-5 w-5 opacity-80" />
      </div>
    );
  }
  return (
    <div className="flex items-center gap-2 px-3 pt-2" data-markt-rodape="">
      <LogoMarkt className="h-5 opacity-90" />
      <span className="text-[10px] text-muted-foreground">© {new Date().getFullYear()}</span>
    </div>
  );
}

const CHAVE_ABERTURA = "markt-abertura-vista";

/**
 * Tela de abertura: a logo aparece uma vez por sessão do navegador e some
 * sozinha. Não bloqueia nada — se o sessionStorage falhar, simplesmente não
 * aparece.
 */
export function AberturaMarkt() {
  const [fase, setFase] = React.useState<"oculta" | "visivel" | "saindo">("oculta");

  React.useEffect(() => {
    let jaViu = false;
    try {
      jaViu = window.sessionStorage.getItem(CHAVE_ABERTURA) === "1";
      window.sessionStorage.setItem(CHAVE_ABERTURA, "1");
    } catch {
      jaViu = true;
    }
    if (jaViu) return;
    // Revelar a abertura depois da hidratação é o objetivo deste efeito.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setFase("visivel");
    const sair = window.setTimeout(() => setFase("saindo"), 1100);
    const fim = window.setTimeout(() => setFase("oculta"), 1600);
    return () => {
      window.clearTimeout(sair);
      window.clearTimeout(fim);
    };
  }, []);

  if (fase === "oculta") return null;
  return (
    <div
      aria-hidden
      className={cn(
        "fixed inset-0 z-[2147483646] flex flex-col items-center justify-center gap-6 bg-white transition-opacity duration-500",
        fase === "saindo" ? "opacity-0" : "opacity-100",
      )}
    >
      <LogoMarkt className="h-16 animate-[markt-surge_0.6s_ease-out]" />
      <div className="h-1 w-40 overflow-hidden rounded-full bg-[#e8f5f5]">
        <div className="h-full w-full origin-left animate-[markt-carrega_1.1s_ease-in-out] rounded-full bg-[#22989d]" />
      </div>
    </div>
  );
}
