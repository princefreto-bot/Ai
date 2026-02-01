import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';

export function Privacy() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      <main className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold text-slate-900 mb-8">Politique de Confidentialité</h1>
          <p className="text-slate-600 mb-8">Dernière mise à jour : Janvier 2024</p>

          <div className="prose prose-slate max-w-none">
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">1. Introduction</h2>
              <p className="text-slate-700 mb-4">
                TradeScalpSnip (ci-après "nous", "notre" ou "le Service") s'engage à protéger votre vie privée.
                Cette Politique de Confidentialité explique comment nous collectons, utilisons, stockons et protégeons 
                vos données personnelles conformément au Règlement Général sur la Protection des Données (RGPD) 
                et aux lois applicables.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">2. Responsable du Traitement</h2>
              <p className="text-slate-700">
                Le responsable du traitement des données personnelles est TradeScalpSnip SAS, 
                dont le siège social est situé à Paris, France.
              </p>
              <p className="text-slate-700 mt-2">
                Contact DPO : privacy@tradevisionai.com
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">3. Données Collectées</h2>
              <p className="text-slate-700 mb-4">
                Nous collectons les types de données suivants :
              </p>
              
              <h3 className="text-xl font-semibold text-slate-900 mb-2">3.1 Données d'identification</h3>
              <ul className="list-disc pl-6 text-slate-700 space-y-2 mb-4">
                <li>Nom et prénom</li>
                <li>Adresse email</li>
                <li>Mot de passe (hashé et chiffré)</li>
              </ul>

              <h3 className="text-xl font-semibold text-slate-900 mb-2">3.2 Données d'utilisation</h3>
              <ul className="list-disc pl-6 text-slate-700 space-y-2 mb-4">
                <li>Images de graphiques uploadées pour analyse</li>
                <li>Historique des analyses effectuées</li>
                <li>Préférences utilisateur</li>
                <li>Logs de connexion</li>
              </ul>

              <h3 className="text-xl font-semibold text-slate-900 mb-2">3.3 Données de paiement</h3>
              <ul className="list-disc pl-6 text-slate-700 space-y-2">
                <li>Informations de facturation (traitées par Stripe)</li>
                <li>Historique des transactions</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">4. Finalités du Traitement</h2>
              <p className="text-slate-700 mb-4">
                Vos données sont traitées pour les finalités suivantes :
              </p>
              <ul className="list-disc pl-6 text-slate-700 space-y-2">
                <li>Fourniture et amélioration du Service</li>
                <li>Gestion de votre compte utilisateur</li>
                <li>Traitement des paiements et facturation</li>
                <li>Communication relative au Service (mises à jour, notifications)</li>
                <li>Analyse statistique anonymisée pour améliorer nos algorithmes</li>
                <li>Respect de nos obligations légales</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">5. Base Légale du Traitement</h2>
              <p className="text-slate-700 mb-4">
                Nos traitements de données reposent sur les bases légales suivantes :
              </p>
              <ul className="list-disc pl-6 text-slate-700 space-y-2">
                <li><strong>Exécution du contrat :</strong> fourniture du Service</li>
                <li><strong>Consentement :</strong> communications marketing</li>
                <li><strong>Intérêt légitime :</strong> amélioration du Service, sécurité</li>
                <li><strong>Obligation légale :</strong> conservation des données de facturation</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">6. Durée de Conservation</h2>
              <p className="text-slate-700 mb-4">
                Nous conservons vos données selon les durées suivantes :
              </p>
              <ul className="list-disc pl-6 text-slate-700 space-y-2">
                <li>Données de compte : durée de l'abonnement + 3 ans</li>
                <li>Images analysées : 30 jours après l'analyse</li>
                <li>Données de facturation : 10 ans (obligation légale)</li>
                <li>Logs de connexion : 1 an</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">7. Partage des Données</h2>
              <p className="text-slate-700 mb-4">
                Nous pouvons partager vos données avec :
              </p>
              <ul className="list-disc pl-6 text-slate-700 space-y-2">
                <li><strong>Stripe :</strong> traitement des paiements (certifié PCI-DSS)</li>
                <li><strong>Hébergeurs :</strong> Render, AWS (serveurs sécurisés)</li>
                <li><strong>Autorités :</strong> sur demande légale uniquement</li>
              </ul>
              <p className="text-slate-700 mt-4">
                Nous ne vendons jamais vos données personnelles à des tiers.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">8. Sécurité des Données</h2>
              <p className="text-slate-700 mb-4">
                Nous mettons en œuvre des mesures de sécurité appropriées :
              </p>
              <ul className="list-disc pl-6 text-slate-700 space-y-2">
                <li>Chiffrement SSL/TLS pour toutes les communications</li>
                <li>Hashage des mots de passe (bcrypt)</li>
                <li>Accès restreint aux données (principe du moindre privilège)</li>
                <li>Surveillance et détection d'intrusion</li>
                <li>Sauvegardes régulières chiffrées</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">9. Vos Droits (RGPD)</h2>
              <p className="text-slate-700 mb-4">
                Conformément au RGPD, vous disposez des droits suivants :
              </p>
              <ul className="list-disc pl-6 text-slate-700 space-y-2">
                <li><strong>Accès :</strong> obtenir une copie de vos données</li>
                <li><strong>Rectification :</strong> corriger des données inexactes</li>
                <li><strong>Effacement :</strong> demander la suppression de vos données</li>
                <li><strong>Limitation :</strong> restreindre le traitement</li>
                <li><strong>Portabilité :</strong> recevoir vos données dans un format standard</li>
                <li><strong>Opposition :</strong> vous opposer à certains traitements</li>
              </ul>
              <p className="text-slate-700 mt-4">
                Pour exercer ces droits, contactez-nous à : privacy@tradevisionai.com
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">10. Cookies</h2>
              <p className="text-slate-700 mb-4">
                Nous utilisons des cookies essentiels pour le fonctionnement du Service :
              </p>
              <ul className="list-disc pl-6 text-slate-700 space-y-2">
                <li>Cookies de session (authentification)</li>
                <li>Cookies de préférences</li>
                <li>Cookies analytiques (avec votre consentement)</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">11. Transferts Internationaux</h2>
              <p className="text-slate-700">
                Vos données sont hébergées dans l'Union Européenne. En cas de transfert hors UE, 
                nous nous assurons que des garanties appropriées sont en place (clauses contractuelles types).
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">12. Modifications</h2>
              <p className="text-slate-700">
                Nous pouvons mettre à jour cette politique. Les modifications significatives vous seront 
                notifiées par email. La date de dernière mise à jour est indiquée en haut de ce document.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">13. Contact</h2>
              <p className="text-slate-700">
                Pour toute question relative à cette politique :<br />
                Email : privacy@tradevisionai.com<br />
                Vous pouvez également déposer une réclamation auprès de la CNIL.
              </p>
            </section>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
