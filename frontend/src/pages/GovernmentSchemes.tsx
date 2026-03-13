import { useState } from 'react'
import { Plus, AlertCircle } from 'lucide-react'
import { useThemeClasses } from '../hooks/useThemeClasses'
import { useLanguage } from '../context/LanguageContext'
import GovernmentSchemesFilter from '../components/GovernmentSchemesFilter'
import GovernmentSchemesList from '../components/GovernmentSchemesList'

export interface GovernmentScheme {
  id: string
  name: string
  description: string
  benefits: string[]
  eligibility: string[]
  applicationProcess: string
  category: 'loan-waiver' | 'subsidy' | 'insurance' | 'pension' | 'direct-benefit' | 'infrastructure'
  budget?: string
  targetBeneficiaries?: string
  contactInfo?: string
  website?: string
}

const GovernmentSchemes = () => {
  const { t } = useLanguage()
  const themeClasses = useThemeClasses()
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [searchTerm, setSearchTerm] = useState('')

  const schemes: GovernmentScheme[] = [
    {
      id: '1',
      name: t('schemes.item1.name'),
      description: t('schemes.item1.desc'),
      benefits: [
        'Complete waiver of crop loans up to ₹2 lakh',
        'Covers all eligible dues till September 30, 2025',
        'Helps farmers access fresh institutional credit',
        'Clears legacy debt for financial relief'
      ],
      eligibility: [
        'Farmers with outstanding crop loans up to ₹2 lakh',
        'Dues pending till September 30, 2025',
        'Maharashtra resident farmers',
        'Registered with agricultural credit institutions'
      ],
      applicationProcess: 'Apply through nearest bank or agricultural office with land documents and loan details',
      category: 'loan-waiver',
      budget: '₹2 lakh per farmer',
      targetBeneficiaries: 'All eligible farmers in Maharashtra',
      website: 'https://mahapeda.gov.in'
    },
    {
      id: '2',
      name: t('schemes.item2.name'),
      description: t('schemes.item2.desc'),
      benefits: [
        'Free electricity for agricultural pumps up to 7.5 HP',
        'Government bears electricity bill burden',
        'Reduces farming operational costs',
        'Supports sustainable agriculture'
      ],
      eligibility: [
        'Farmers with agricultural pumps up to 7.5 HP',
        'Maharashtra resident farmers',
        'Registered with electricity board',
        'Agricultural land ownership proof required'
      ],
      applicationProcess: 'Register with local electricity board office with land documents and pump details',
      category: 'subsidy',
      budget: '₹14,761 crore allocation',
      targetBeneficiaries: '44.06 lakh farmers',
      website: 'https://mahapeda.gov.in'
    },
    {
      id: '3',
      name: t('schemes.item3.name'),
      description: t('schemes.item3.desc'),
      benefits: [
        '₹5,000 per hectare financial assistance',
        'Covers up to 2 hectares per farmer',
        'Applicable for Kharif season',
        'Supports backward regions of Marathwada and Vidarbha'
      ],
      eligibility: [
        'Cotton and soybean farmers',
        'Land holding up to 2 hectares',
        'Farmers in Marathwada and Vidarbha regions',
        'Registered with agricultural department'
      ],
      applicationProcess: 'Apply at taluka agricultural office with land records and crop details',
      category: 'direct-benefit',
      budget: '₹341 crore for 2024-25',
      targetBeneficiaries: 'Cotton and soybean farmers in backward regions',
      website: 'https://mahapeda.gov.in'
    },
    {
      id: '4',
      name: t('schemes.item4.name'),
      description: t('schemes.item4.desc'),
      benefits: [
        'Emergency financial assistance for crop failure',
        'Relief during natural calamities',
        'Quick disbursement of funds',
        'Supports farmer livelihood'
      ],
      eligibility: [
        'Farmers affected by crop failure',
        'Victims of natural calamities',
        'Maharashtra resident farmers',
        'Income certificate required'
      ],
      applicationProcess: 'Apply at district collector office with damage assessment report and documents',
      category: 'direct-benefit',
      budget: '₹375 crore distributed',
      targetBeneficiaries: 'Distressed farmers',
      website: 'https://mahapeda.gov.in'
    },
    {
      id: '5',
      name: t('schemes.item5.name'),
      description: t('schemes.item5.desc'),
      benefits: [
        'Comprehensive accident insurance coverage',
        'Extended to agricultural laborers',
        'Compensation for accidental injuries',
        'Death and disability benefits'
      ],
      eligibility: [
        'Farmers and agricultural laborers',
        'Age between 18-70 years',
        'Maharashtra residents',
        'Valid identification proof'
      ],
      applicationProcess: 'Register through agricultural office or insurance agent with basic details',
      category: 'insurance',
      budget: '₹120 crore allocation for 2026-27',
      targetBeneficiaries: 'Farmers and agricultural laborers',
      website: 'https://mahapeda.gov.in'
    },
    {
      id: '6',
      name: t('schemes.item6.name'),
      description: t('schemes.item6.desc'),
      benefits: [
        'Enhanced irrigation capacity',
        'Reliable water supply for farming',
        'River-linking infrastructure',
        'Long-term water security solution'
      ],
      eligibility: [
        'Farmers in Marathwada region',
        'Agricultural land ownership',
        'Registered with irrigation department',
        'Willing to adopt water conservation'
      ],
      applicationProcess: 'Apply at irrigation department office with land documents and water requirements',
      category: 'infrastructure',
      budget: 'Multi-year allocation',
      targetBeneficiaries: 'Marathwada region farmers',
      website: 'https://mahapeda.gov.in'
    },
    {
      id: '7',
      name: t('schemes.item7.name'),
      description: t('schemes.item7.desc'),
      benefits: [
        'Insurance coverage for crop failure',
        'Protection against natural calamities',
        'Affordable premium rates',
        'Quick claim settlement'
      ],
      eligibility: [
        'All farmers growing notified crops',
        'Loanee and non-loanee farmers',
        'Agricultural land ownership',
        'Valid identification proof'
      ],
      applicationProcess: 'Apply through bank or insurance agent during crop season with land documents',
      category: 'insurance',
      budget: '₹69,515 crore allocation till FY 2025-26',
      targetBeneficiaries: 'All farmers nationwide',
      website: 'https://pmfby.gov.in'
    },
    {
      id: '8',
      name: t('schemes.item8.name'),
      description: t('schemes.item8.desc'),
      benefits: [
        'Free soil testing and analysis',
        'Personalized nutrient recommendations',
        'Improved crop productivity',
        'Reduced fertilizer costs'
      ],
      eligibility: [
        'All farmers in Maharashtra',
        'Agricultural land ownership',
        'Willing to adopt recommendations',
        'No income limit'
      ],
      applicationProcess: 'Register at nearest soil testing laboratory with land details',
      category: 'direct-benefit',
      budget: 'Government funded',
      targetBeneficiaries: 'All farmers',
      website: 'https://soilhealth.dac.gov.in'
    }
  ]

  const categories = [
    { value: 'all', label: t('schemes.allSchemes') },
    { value: 'loan-waiver', label: t('schemes.loanWaiver') },
    { value: 'subsidy', label: t('schemes.subsidy') },
    { value: 'insurance', label: t('schemes.insurance') },
    { value: 'direct-benefit', label: t('schemes.directBenefit') },
    { value: 'infrastructure', label: t('schemes.infrastructure') }
  ]

  const filteredSchemes = schemes.filter(scheme => {
    const matchesCategory = selectedCategory === 'all' || scheme.category === selectedCategory
    const matchesSearch = scheme.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         scheme.description.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesCategory && matchesSearch
  })

  return (
    <div>
      <div className="mb-8">
        <h1 className={`text-4xl font-bold mb-2 ${themeClasses.text.primary}`}>
          {t('schemes.title')}
        </h1>
        <p className={themeClasses.text.secondary}>
          {t('schemes.subtitle')}
        </p>
      </div>

      <GovernmentSchemesFilter
        categories={categories}
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
      />

      {filteredSchemes.length === 0 ? (
        <div className="mb-6 bg-yellow-500/10 border border-yellow-500/20 rounded-xl p-4 flex items-center gap-3">
          <AlertCircle className="text-yellow-400" size={20} />
          <p className="text-yellow-300">{t('schemes.noSchemesFound')}</p>
        </div>
      ) : (
        <GovernmentSchemesList schemes={filteredSchemes} />
      )}

      {/* Floating Action Button */}
      <button className="fixed bottom-6 right-6 w-14 h-14 bg-green-600 hover:bg-green-700 rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all hover:scale-110">
        <Plus className="text-white" size={28} />
      </button>
    </div>
  )
}

export default GovernmentSchemes
