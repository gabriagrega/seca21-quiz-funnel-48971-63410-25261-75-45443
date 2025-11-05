import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import logoSeca21 from "@/assets/logo-seca21.png";
import { useNavigate } from "react-router-dom";

const Privacy = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/10 py-6 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="flex justify-center mb-6">
          <img src={logoSeca21} alt="SECA21" className="h-10" />
        </div>

        <Card className="p-6">
          <h1 className="text-2xl font-bold mb-3">Política de Privacidade</h1>

          <p className="text-sm text-muted-foreground mb-4">
            Nesta página explicamos de forma simples como usamos os dados que você nos
            fornece no SECA21. Queremos ser transparentes: coletamos apenas o necessário
            para entregar conteúdo, suporte e ofertas relacionadas ao programa.
          </p>

          <h3 className="font-semibold mt-3">Por que pedimos seus dados?</h3>
          <ul className="list-disc pl-5 text-sm mb-3">
            <li>Enviar atualizações sobre o programa e conteúdo extra;</li>
            <li>Enviar promoções e ofertas especiais relacionadas ao SECA21;</li>
            <li>Prestar suporte via e-mail ou WhatsApp quando necessário;</li>
            <li>Personalizar recomendações com base nas suas respostas ao quiz.</li>
          </ul>

          <h3 className="font-semibold mt-3">Que dados coletamos?</h3>
          <p className="text-sm text-muted-foreground mb-3">
            Podemos coletar nome, e-mail, telefone/WhatsApp e respostas do quiz. Só usamos
            dados de contato quando você nos autoriza explicitamente (consentimento). Se
            você recusar, continuamos oferecendo o conteúdo sem enviar comunicações promocionais.
          </p>

          <h3 className="font-semibold mt-3">Como você pode revogar o consentimento?</h3>
          <p className="text-sm text-muted-foreground mb-3">
            Você pode revogar o consentimento a qualquer momento em <strong>Gerenciar consentimento</strong>
            dentro do quiz, ou enviando um e-mail para contato@somosagrega.com.br. Ao revogar,
            pararemos de usar seus contatos para comunicações e promoções.
          </p>

          <h3 className="font-semibold mt-3">Compartilhamento e segurança</h3>
          <p className="text-sm text-muted-foreground mb-3">
            Não compartilhamos seus dados com terceiros sem o seu consentimento, exceto quando
            exigido por lei. Mantemos medidas técnicas razoáveis para proteger as informações.
          </p>

          <div className="mt-4">
            <Button onClick={() => navigate(-1)}>Voltar</Button>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Privacy;
