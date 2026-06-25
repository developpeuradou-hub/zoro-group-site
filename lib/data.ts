export type Bien = {
  id: string
  titre: string
  type: 'villa' | 'appartement' | 'terrain' | 'immeuble'
  transaction: 'vente' | 'location'
  prix: number
  devise: string
  prixLabel: string
  superficie: number
  chambres?: number
  sallesDeBain?: number
  localisation: string
  quartier: string
  ville: string
  description: string
  titreFoncier?: boolean
  meuble?: boolean
  piscine?: boolean
  garage?: boolean
  statut: 'disponible' | 'vendu' | 'loue'
  coupDeCoeur?: boolean
  nouveau?: boolean
  photos: number
  gradient: string
}

export const biens: Bien[] = [
  {
    id: '1', titre: 'Villa Moderne F5', type: 'villa', transaction: 'vente',
    prix: 85000000, devise: 'FCFA', prixLabel: '85 000 000 FCFA',
    superficie: 250, chambres: 4, sallesDeBain: 3,
    localisation: 'Quartier Lac, San Pedro', quartier: 'Quartier Lac', ville: 'San Pedro',
    description: 'Magnifique villa moderne F5 avec finitions haut de gamme, jardin aménagé et garage double.',
    titreFoncier: true, garage: true, statut: 'disponible', coupDeCoeur: true, photos: 6,
    gradient: 'linear-gradient(135deg, #8B0000, #C0392B)',
  },
  {
    id: '2', titre: 'Appartement F3 Meublé', type: 'appartement', transaction: 'location',
    prix: 350000, devise: 'FCFA', prixLabel: '350 000 FCFA/mois',
    superficie: 80, chambres: 2, sallesDeBain: 2,
    localisation: 'Centre-ville, San Pedro', quartier: 'Centre-ville', ville: 'San Pedro',
    description: 'Appartement F3 entièrement meublé, idéal pour cadres et expatriés.',
    meuble: true, statut: 'disponible', photos: 4,
    gradient: 'linear-gradient(135deg, #2c3e50, #34495e)',
  },
  {
    id: '3', titre: 'Terrain Viabilisé', type: 'terrain', transaction: 'vente',
    prix: 12500000, devise: 'FCFA', prixLabel: '12 500 000 FCFA',
    superficie: 500, localisation: 'Zone Résidentielle, San Pedro',
    quartier: 'Zone Résidentielle', ville: 'San Pedro',
    description: 'Terrain viabilisé avec titre foncier, eau et électricité disponibles.',
    titreFoncier: true, statut: 'disponible', photos: 3,
    gradient: 'linear-gradient(135deg, #1a6b3a, #27ae60)',
  },
  {
    id: '4', titre: 'Immeuble de Rapport R+2', type: 'immeuble', transaction: 'vente',
    prix: 220000000, devise: 'FCFA', prixLabel: '220 000 000 FCFA',
    superficie: 400, localisation: 'Zone Commerciale, San Pedro',
    quartier: 'Zone Commerciale', ville: 'San Pedro',
    description: 'Immeuble R+2 composé de 6 appartements, excellent investissement locatif.',
    titreFoncier: true, statut: 'disponible', photos: 5,
    gradient: 'linear-gradient(135deg, #4a1942, #7d3c98)',
  },
  {
    id: '5', titre: 'Villa F4 avec Piscine', type: 'villa', transaction: 'location',
    prix: 800000, devise: 'FCFA', prixLabel: '800 000 FCFA/mois',
    superficie: 300, chambres: 3, sallesDeBain: 3,
    localisation: 'Cité des Cadres, San Pedro', quartier: 'Cité des Cadres', ville: 'San Pedro',
    description: 'Villa haut standing avec piscine, sécurité 24h/24, idéale familles expatriées.',
    piscine: true, garage: true, meuble: true, statut: 'disponible', photos: 7,
    gradient: 'linear-gradient(135deg, #1a4a6b, #2980b9)',
  },
  {
    id: '6', titre: 'Terrain Industriel', type: 'terrain', transaction: 'vente',
    prix: 45000000, devise: 'FCFA', prixLabel: '45 000 000 FCFA',
    superficie: 2000, localisation: 'Zone Industrielle, San Pedro',
    quartier: 'Zone Industrielle', ville: 'San Pedro',
    description: 'Grand terrain en zone industrielle, idéal pour entrepôt ou unité de production.',
    titreFoncier: true, statut: 'disponible', nouveau: true, photos: 5,
    gradient: 'linear-gradient(135deg, #6b4226, #b5602a)',
  },
  {
    id: '7', titre: 'Studio Meublé', type: 'appartement', transaction: 'location',
    prix: 150000, devise: 'FCFA', prixLabel: '150 000 FCFA/mois',
    superficie: 35, chambres: 1, sallesDeBain: 1,
    localisation: 'Plateau, San Pedro', quartier: 'Plateau', ville: 'San Pedro',
    description: 'Studio moderne entièrement meublé et équipé, parfait pour professionnel.',
    meuble: true, statut: 'disponible', photos: 4,
    gradient: 'linear-gradient(135deg, #1a5276, #2471a3)',
  },
  {
    id: '8', titre: 'Villa F6 Prestige', type: 'villa', transaction: 'vente',
    prix: 150000000, devise: 'FCFA', prixLabel: '150 000 000 FCFA',
    superficie: 400, chambres: 5, sallesDeBain: 4,
    localisation: 'Résidence Prestige, San Pedro', quartier: 'Résidence Prestige', ville: 'San Pedro',
    description: 'Villa prestige F6 dans résidence sécurisée, piscine, dépendance, finitions luxe.',
    titreFoncier: true, piscine: true, garage: true, statut: 'disponible', coupDeCoeur: true, photos: 9,
    gradient: 'linear-gradient(135deg, #7b1f1f, #c0392b)',
  },
]

export type Realisation = {
  id: string
  titre: string
  categorie: 'construction' | 'renovation' | 'amenagement' | 'genie-civil'
  ville: string
  annee: number
  superficie?: number
  duree: string
  description: string
  details: string
  gradient: string
  image?: string
  photos: number
  tags: string[]
}

export const realisations: Realisation[] = [
  {
    id: 'r1',
    titre: 'Villa Résidentielle F6 — Quartier Lac',
    categorie: 'construction',
    ville: 'San Pedro',
    annee: 2024,
    superficie: 320,
    duree: '8 mois',
    description: 'Construction complète d\'une villa F6 haut standing avec piscine, garage double et jardin paysager.',
    details: 'Fondations spéciales, structure béton armé, finitions premium, installation électrique et plomberie complète, cuisine équipée, 5 chambres climatisées.',
    gradient: 'linear-gradient(135deg, #8B0000, #C0392B)',
    image: '/images/service-construction.jpg',
    photos: 12,
    tags: ['Villa', 'Résidentiel', 'Piscine', 'Clé en main'],
  },
  {
    id: 'r2',
    titre: 'Réhabilitation Immeuble R+3',
    categorie: 'renovation',
    ville: 'San Pedro',
    annee: 2024,
    superficie: 600,
    duree: '5 mois',
    description: 'Réhabilitation complète d\'un immeuble R+3 de 12 appartements : façade, toiture, installations électriques et sanitaires.',
    details: 'Ravalement de façade, étanchéité toiture, remplacement réseaux électriques et plomberie, peinture intérieure/extérieure, pose carrelage.',
    gradient: 'linear-gradient(135deg, #B8952A, #8B6914)',
    image: '/images/realisation-fondations.jpg',
    photos: 8,
    tags: ['Rénovation', 'Immeuble', 'R+3'],
  },
  {
    id: 'r3',
    titre: 'Lotissement Résidentiel — 45 parcelles',
    categorie: 'amenagement',
    ville: 'San Pedro',
    annee: 2023,
    superficie: 25000,
    duree: '6 mois',
    description: 'Viabilisation et aménagement foncier d\'un lotissement de 45 parcelles avec voiries, réseaux et espaces verts.',
    details: 'Levé topographique, bornage, voiries bitumées, réseau eau potable, réseau électrique BT, éclairage public, plantation arbres.',
    gradient: 'linear-gradient(135deg, #1a6b3a, #27ae60)',
    image: '/images/realisation-voirie.jpg',
    photos: 10,
    tags: ['Lotissement', 'Foncier', 'Voirie'],
  },
  {
    id: 'r4',
    titre: 'Bureaux Commerciaux — Zone Centre',
    categorie: 'construction',
    ville: 'San Pedro',
    annee: 2023,
    superficie: 450,
    duree: '10 mois',
    description: 'Construction d\'un immeuble de bureaux R+2 avec showroom au rez-de-chaussée et 8 plateaux de bureaux.',
    details: 'Structure métal + béton, façade vitrée, climatisation centrale, faux plafonds, câblage réseau structuré, parking 20 véhicules.',
    gradient: 'linear-gradient(135deg, #1a3a5c, #2c5f8a)',
    image: '/images/realisation-sol.jpg',
    photos: 9,
    tags: ['Commercial', 'Bureaux', 'R+2'],
  },
  {
    id: 'r5',
    titre: 'Rénovation Villa Cité des Cadres',
    categorie: 'renovation',
    ville: 'San Pedro',
    annee: 2024,
    superficie: 280,
    duree: '3 mois',
    description: 'Rénovation complète intérieure d\'une villa F5 : placo, sol époxy, salle de bain luxe, cuisine américaine.',
    details: 'Démolition cloisons, pose placoplatre, sol résine époxy toutes pièces, salle de bain italienne, cuisine sur mesure, peinture décorative.',
    gradient: 'linear-gradient(135deg, #4a1942, #7d3c98)',
    image: '/images/equipe-terrain.jpg',
    photos: 7,
    tags: ['Rénovation', 'Intérieur', 'Époxy'],
  },
  {
    id: 'r6',
    titre: 'Mur de Clôture & Portail Automatique',
    categorie: 'genie-civil',
    ville: 'San Pedro',
    annee: 2023,
    superficie: undefined,
    duree: '3 semaines',
    description: 'Construction de 180 ml de mur de clôture avec portail coulissant motorisé et système de vidéosurveillance.',
    details: 'Fondations béton armé, élévation parpaings, enduit décoratif, portail aluminium motorisé, 6 caméras IP, interphone vidéo.',
    gradient: 'linear-gradient(135deg, #2d5a27, #4a8f42)',
    image: '/images/realisation-drainage.jpg',
    photos: 5,
    tags: ['Clôture', 'Sécurité', 'Portail'],
  },
]

export type Article = {
  id: string
  titre: string
  slug: string
  categorie: 'immobilier' | 'construction' | 'conseils' | 'actualites'
  auteur: string
  date: string
  resume: string
  contenu: string
  tempsLecture: number
  gradient: string
  tags: string[]
}

export const articles: Article[] = [
  {
    id: 'a1',
    titre: "Comment bien choisir son terrain à San Pedro ?",
    slug: 'choisir-terrain-san-pedro',
    categorie: 'conseils',
    auteur: 'Zoro Group SARL',
    date: '2026-05-15',
    resume: "L'achat d'un terrain est une décision importante. Découvrez les critères essentiels pour faire le bon choix à San Pedro.",
    contenu: "L'achat d'un terrain à San Pedro nécessite une attention particulière à plusieurs critères : la localisation, la viabilisation, le titre foncier et la situation juridique. Voici nos conseils d'experts pour sécuriser votre investissement.\n\n**1. Vérifier le titre foncier**\nAvant tout achat, exigez le titre foncier officiel. C'est le seul document qui garantit la propriété légale du terrain en Côte d'Ivoire.\n\n**2. Évaluer la viabilisation**\nUn terrain viabilisé dispose des réseaux eau, électricité et voirie. Cela représente une valeur ajoutée significative et évite des coûts supplémentaires.\n\n**3. Analyser la localisation**\nProximité des services, accessibilité, développement du quartier — ces facteurs influencent directement la valeur future de votre bien.",
    tempsLecture: 4,
    gradient: 'linear-gradient(135deg, #8B0000, #C0392B)',
    tags: ['Terrain', 'Investissement', 'Conseil'],
  },
  {
    id: 'a2',
    titre: "Les étapes clés d'un projet de construction",
    slug: 'etapes-projet-construction',
    categorie: 'construction',
    auteur: 'Zoro Group SARL',
    date: '2026-04-28',
    resume: "De la conception aux finitions, découvrez les grandes phases d'un chantier de construction réussi avec Zoro Group.",
    contenu: "Un projet de construction bien mené suit un processus rigoureux en plusieurs étapes clés. Chez Zoro Group, nous accompagnons nos clients à chaque phase pour garantir qualité et respect des délais.\n\n**Phase 1 : Étude et conception**\nAnalyse des besoins, élaboration des plans architecturaux 2D/3D, obtention des autorisations administratives.\n\n**Phase 2 : Terrassement et fondations**\nPréparation du terrain, fouilles, coulage des fondations selon les études de sol.\n\n**Phase 3 : Gros œuvre**\nÉlévation des murs, structure béton armé, toiture.\n\n**Phase 4 : Second œuvre**\nPlomberie, électricité, isolation, plâtrerie, menuiseries.\n\n**Phase 5 : Finitions**\nCarrelage, peinture, équipements sanitaires, livraison.",
    tempsLecture: 5,
    gradient: 'linear-gradient(135deg, #1a3a5c, #2c5f8a)',
    tags: ['Construction', 'Chantier', 'Guide'],
  },
  {
    id: 'a3',
    titre: "Investir dans l'immobilier à San Pedro : opportunités 2026",
    slug: 'investir-immobilier-san-pedro-2026',
    categorie: 'immobilier',
    auteur: 'Zoro Group SARL',
    date: '2026-03-10',
    resume: "San Pedro connaît une croissance économique soutenue. Pourquoi c'est le bon moment pour investir dans l'immobilier local.",
    contenu: "San Pedro, deuxième port de Côte d'Ivoire, connaît une croissance économique soutenue portée par l'expansion portuaire et le développement industriel. Ce dynamisme crée des opportunités uniques pour les investisseurs immobiliers.\n\n**Pourquoi San Pedro ?**\nAvec l'extension du port autonome et l'installation de nouvelles entreprises, la demande en logements de qualité est en forte hausse. Les prix restent encore accessibles comparés à Abidjan.\n\n**Les secteurs porteurs**\nLes quartiers Lac, Cité des Cadres et la zone commerciale offrent les meilleures perspectives de valorisation à moyen terme.",
    tempsLecture: 6,
    gradient: 'linear-gradient(135deg, #B8952A, #8B6914)',
    tags: ['Investissement', 'San Pedro', 'Marché'],
  },
  {
    id: 'a4',
    titre: "Rénovation : le sol en résine époxy, tendance 2026",
    slug: 'sol-resine-epoxy-tendance-2026',
    categorie: 'conseils',
    auteur: 'Zoro Group SARL',
    date: '2026-02-20',
    resume: "Le sol en résine époxy s'impose comme la solution moderne et durable pour les intérieurs résidentiels et commerciaux.",
    contenu: "La résine époxy s'est imposée comme l'un des revêtements de sol les plus prisés ces dernières années, aussi bien dans les espaces résidentiels que commerciaux. Chez Zoro Group, nous proposons ce service avec des finitions haut de gamme.\n\n**Avantages de la résine époxy**\nRésistance exceptionnelle, facilité d'entretien, imperméabilité totale, esthétique moderne et disponible en nombreuses couleurs et finitions.\n\n**Domaines d'application**\nSalons, cuisines, salles de bain, garages, showrooms, restaurants — la résine s'adapte à tous les espaces.\n\n**Durabilité**\nAvec un entretien minimal, un sol en résine époxy peut durer plus de 20 ans.",
    tempsLecture: 3,
    gradient: 'linear-gradient(135deg, #4a1942, #7d3c98)',
    tags: ['Rénovation', 'Époxy', 'Intérieur'],
  },
  {
    id: 'a5',
    titre: "Gestion locative : confier son bien à un professionnel",
    slug: 'gestion-locative-professionnelle',
    categorie: 'immobilier',
    auteur: 'Zoro Group SARL',
    date: '2026-01-15',
    resume: "Propriétaires bailleurs, découvrez pourquoi confier la gestion de votre bien à Zoro Group est la meilleure décision.",
    contenu: "Posséder un bien immobilier en location est une excellente source de revenus passifs. Mais gérer soi-même sa propriété peut s'avérer chronophage et source de stress. Zoro Group vous propose une solution clé en main.\n\n**Ce que nous gérons pour vous**\nRecherche et sélection des locataires, rédaction des contrats, état des lieux, encaissement des loyers, gestion des réparations, suivi administratif.\n\n**Nos garanties**\nVersement mensuel des loyers même en cas d'impayé, rapport mensuel détaillé, intervention rapide en cas de problème technique.",
    tempsLecture: 4,
    gradient: 'linear-gradient(135deg, #1a6b3a, #27ae60)',
    tags: ['Gestion', 'Location', 'Propriétaire'],
  },
  {
    id: 'a6',
    titre: "Sécurité électronique : protéger votre bien en 2026",
    slug: 'securite-electronique-bien-immobilier',
    categorie: 'actualites',
    auteur: 'Zoro Group SARL',
    date: '2025-12-05',
    resume: "Alarmes, vidéosurveillance, contrôle d'accès — notre guide pour sécuriser efficacement votre propriété à San Pedro.",
    contenu: "La sécurité de votre bien immobilier est une priorité. Zoro Group propose des solutions complètes de sécurité électronique adaptées à tous les budgets.\n\n**Vidéosurveillance IP**\nCaméras haute résolution, vision nocturne, accès à distance depuis votre smartphone, enregistrement cloud sécurisé.\n\n**Alarme anti-intrusion**\nDétecteurs de mouvement, capteurs d'ouverture, sirène et télésurveillance 24h/24.\n\n**Contrôle d'accès**\nPortail automatique, interphone vidéo, badges et lecteurs biométriques pour les accès sécurisés.",
    tempsLecture: 3,
    gradient: 'linear-gradient(135deg, #2d5a27, #4a8f42)',
    tags: ['Sécurité', 'Électronique', 'Alarme'],
  },
]