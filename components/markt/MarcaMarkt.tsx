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

/**
 * Tela de abertura: a logo aparece uma vez por sessão do navegador, já no
 * primeiro quadro (vem no HTML do servidor), e some sozinha.
 */
export function AberturaMarkt() {
  return (
    <div id="markt-abertura" aria-hidden>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={MARKT_LOGO} alt="" className="markt-abertura-logo" />
      <div className="markt-abertura-trilho">
        <div className="markt-abertura-barra" />
      </div>
    </div>
  );
}
