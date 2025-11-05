import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { useState } from "react";

interface ConsentModalProps {
  open: boolean;
  onAccept: () => void;
  onDecline?: () => void;
  consentGiven?: boolean;
  acceptedAt?: string | null;
  onRevoke?: () => void;
}

export const ConsentModal = ({ open, onAccept, onDecline, consentGiven = false, acceptedAt = null, onRevoke }: ConsentModalProps) => {
  const [checked, setChecked] = useState(false);
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="w-full max-w-2xl">
        <Card className="p-6">
          <h3 className="text-xl font-bold mb-2">Consentimento para uso de dados (LGPD)</h3>
          {!consentGiven ? (
            <>
              <p className="text-sm text-muted-foreground mb-4">
                Para personalizar suas mensagens, entrar em contato via WhatsApp ou e-mail e
                enviar recomendações personalizadas (incluindo atualizações, promoções e suporte), precisamos do seu consentimento
                para coletar e armazenar nome, e-mail e WhatsApp. Seus dados serão usados apenas
                para fins relacionados ao SECA21 e não serão compartilhados com terceiros sem seu consentimento.
              </p>

              <label className="flex items-start gap-3 mb-4">
                <Checkbox checked={checked} onCheckedChange={(v) => setChecked(Boolean(v))} />
                <span className="text-sm">Li e concordo com o uso dos meus dados pessoais conforme descrito acima.</span>
              </label>

              <p className="text-xs text-muted-foreground mb-4">
                Ao aceitar você autoriza o envio de atualizações do programa, ofertas e comunicações importantes relacionadas ao SECA21.
                Consulte nossa <a href="/privacidade" className="underline">Política de Privacidade</a> para mais detalhes.
              </p>

              <div className="flex gap-3 justify-end">
                <Button variant="ghost" onClick={() => { if (onDecline) onDecline(); }}>
                  Recusar
                </Button>
                <Button disabled={!checked} onClick={() => onAccept()}>
                  Aceitar e continuar
                </Button>
              </div>
            </>
          ) : (
            <>
              <p className="text-sm text-muted-foreground mb-4">Você já aceitou o uso dos seus dados em {acceptedAt ? new Date(acceptedAt).toLocaleString() : ''}.</p>
              <p className="text-sm text-muted-foreground mb-4">Se quiser, você pode revogar o consentimento — isso fará com que seu contato não seja mais usado para comunicações e promoções.</p>
              <div className="flex gap-3 justify-end">
                <Button variant="ghost" onClick={() => { if (onRevoke) onRevoke(); }}>
                  Revogar consentimento
                </Button>
                <Button onClick={() => { if (onDecline) onDecline(); }}>
                  Fechar
                </Button>
              </div>
            </>
          )}
        </Card>
      </div>
    </div>
  );
};

export default ConsentModal;
