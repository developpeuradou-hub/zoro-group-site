import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export type RealisationDB = {
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
  created_at: string
}

export type BienDB = {
  id: string
  titre: string
  type: 'villa' | 'appartement' | 'terrain' | 'immeuble'
  transaction: 'vente' | 'location'
  prix: number
  prix_label: string
  superficie: number
  chambres?: number
  salles_de_bain?: number
  localisation: string
  quartier: string
  ville: string
  description: string
  titre_foncier?: boolean
  meuble?: boolean
  piscine?: boolean
  garage?: boolean
  statut: 'disponible' | 'vendu' | 'loue'
  coup_de_coeur?: boolean
  nouveau?: boolean
  gradient: string
  image?: string
  images?: string[]
  photos: number
  created_at: string
}

export type ArticleDB = {
  id: string
  titre: string
  slug: string
  categorie: 'immobilier' | 'construction' | 'conseils' | 'actualites'
  auteur: string
  date: string
  resume: string
  contenu: string
  temps_lecture: number
  gradient: string
  tags: string[]
  publie: boolean
  created_at: string
}

export type MessageDB = {
  id: string
  nom: string
  telephone: string
  email?: string
  sujet: string
  message: string
  whatsapp: boolean
  lu: boolean
  created_at: string
}
