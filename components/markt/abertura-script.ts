/**
 * Markt Saúde — script da tela de abertura. Vai no <head> (app/layout.tsx) e
 * roda ANTES da página aparecer: se a abertura já foi vista nesta sessão do
 * navegador, marca o <html> e o CSS (app/markt.css) a esconde na hora; senão,
 * grava a marca e programa a saída. Arquivo sem "use client" de propósito: o
 * layout é server component e precisa da string, não de uma referência.
 */
const CHAVE = "markt-abertura-vista";

export const SCRIPT_ABERTURA_MARKT = `(function(){var h=document.documentElement;try{if(sessionStorage.getItem('${CHAVE}')==='1'){h.setAttribute('data-markt-vista','');return;}sessionStorage.setItem('${CHAVE}','1');}catch(e){h.setAttribute('data-markt-vista','');return;}setTimeout(function(){h.setAttribute('data-markt-saindo','');},1300);setTimeout(function(){h.setAttribute('data-markt-vista','');},1800);})();`;
