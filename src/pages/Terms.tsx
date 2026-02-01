import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';

export function Terms() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      <main className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold text-slate-900 mb-8">Conditions Générales d'Utilisation</h1>
          <p className="text-slate-600 mb-8">Dernière mise à jour : Janvier 2024</p>

          <div className="prose prose-slate max-w-none">
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">1. Présentation du Service</h2>
              <p className="text-slate-700 mb-4">
                TradeScalpSnip (ci-après "le Service") est une plateforme d'analyse technique basée sur l'intelligence artificielle. 
                Le Service utilise des algorithmes de Computer Vision pour analyser des images de graphiques de trading 
                et fournir des indications techniques sous forme de signaux (BUY, SELL, WAIT), zones d'entrée, 
                stop loss et take profit suggérés.
              </p>
              <p className="text-slate-700">
                Le Service est édité par TradeScalpSnip SAS, société immatriculée au Registre du Commerce et des Sociétés.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">2. Acceptation des Conditions</h2>
              <p className="text-slate-700 mb-4">
                En accédant ou en utilisant le Service, vous acceptez d'être lié par ces Conditions Générales d'Utilisation.
                Si vous n'acceptez pas ces conditions, vous ne devez pas utiliser le Service.
              </p>
              <p className="text-slate-700">
                Nous nous réservons le droit de modifier ces conditions à tout moment. Les modifications entrent en vigueur 
                dès leur publication sur le site. Il vous appartient de consulter régulièrement ces conditions.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">3. Description du Service</h2>
              <p className="text-slate-700 mb-4">
                TradeScalpSnip propose les fonctionnalités suivantes :
              </p>
              <ul className="list-disc pl-6 text-slate-700 space-y-2 mb-4">
                <li>Upload d'images de graphiques de trading</li>
                <li>Analyse automatisée par intelligence artificielle</li>
                <li>Génération de signaux de trading (BUY, SELL, WAIT)</li>
                <li>Suggestion de zones d'entrée, stop loss et take profit</li>
                <li>Score de confiance et grade de qualité du setup</li>
                <li>Explication textuelle de l'analyse</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">4. Avertissement sur les Risques</h2>
              <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-6 mb-4">
                <p className="text-yellow-800 font-semibold mb-2">⚠️ AVERTISSEMENT IMPORTANT</p>
                <p className="text-yellow-800">
                  Le trading de produits financiers comporte des risques significatifs et peut entraîner la perte 
                  totale de votre capital investi. Les performances passées ne garantissent pas les résultats futurs.
                </p>
              </div>
              <p className="text-slate-700 mb-4">
                Les analyses et signaux fournis par TradeScalpSnip sont générés par des algorithmes d'intelligence artificielle 
                et sont fournis à titre informatif uniquement. Ils ne constituent en aucun cas :
              </p>
              <ul className="list-disc pl-6 text-slate-700 space-y-2">
                <li>Un conseil en investissement</li>
                <li>Une recommandation d'achat ou de vente</li>
                <li>Une incitation à trader</li>
                <li>Une garantie de résultat</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">5. Compte Utilisateur</h2>
              <p className="text-slate-700 mb-4">
                Pour utiliser le Service, vous devez créer un compte utilisateur. Vous êtes responsable de :
              </p>
              <ul className="list-disc pl-6 text-slate-700 space-y-2">
                <li>Maintenir la confidentialité de vos identifiants de connexion</li>
                <li>Toutes les activités effectuées sous votre compte</li>
                <li>Nous informer immédiatement de toute utilisation non autorisée</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">6. Abonnement et Paiement</h2>
              <p className="text-slate-700 mb-4">
                Le Service propose différentes formules d'abonnement. Les paiements sont traités de manière sécurisée 
                via Stripe. En souscrivant à un abonnement payant :
              </p>
              <ul className="list-disc pl-6 text-slate-700 space-y-2">
                <li>Vous autorisez le prélèvement automatique mensuel</li>
                <li>L'abonnement est renouvelé automatiquement sauf annulation</li>
                <li>Vous pouvez annuler à tout moment depuis votre compte</li>
                <li>Les remboursements sont possibles dans les 14 jours suivant le premier paiement</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">7. Limitation de Responsabilité</h2>
              <p className="text-slate-700 mb-4">
                Dans les limites autorisées par la loi applicable, TradeScalpSnip ne pourra être tenu responsable 
                de tout dommage direct, indirect, accessoire, spécial ou consécutif résultant de :
              </p>
              <ul className="list-disc pl-6 text-slate-700 space-y-2">
                <li>L'utilisation ou l'impossibilité d'utiliser le Service</li>
                <li>Toute décision de trading prise sur la base des analyses fournies</li>
                <li>Toute perte financière liée au trading</li>
                <li>Toute interruption ou erreur du Service</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">8. Propriété Intellectuelle</h2>
              <p className="text-slate-700">
                Tous les contenus du Service (algorithmes, design, textes, logos) sont la propriété exclusive 
                de TradeScalpSnip et sont protégés par les lois sur la propriété intellectuelle. 
                Toute reproduction non autorisée est strictement interdite.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">9. Droit Applicable</h2>
              <p className="text-slate-700">
                Les présentes Conditions sont régies par le droit français. Tout litige sera soumis 
                à la compétence exclusive des tribunaux français.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">10. Contact</h2>
              <p className="text-slate-700">
                Pour toute question concernant ces Conditions, contactez-nous à : legal@tradevisionai.com
              </p>
            </section>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
