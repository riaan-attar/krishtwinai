import { TrendingUp } from 'lucide-react'
import { FormEvent } from 'react'
import { useLanguage } from '../context/LanguageContext'

interface ProfitAnalyzerProps {
  onAnalyze: (data: { crop: string; mandi: string; }) => void
}

const ProfitAnalyzer = ({ onAnalyze }: ProfitAnalyzerProps) => {
  const { t } = useLanguage()
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    onAnalyze({
      crop: formData.get('crop') as string,
      mandi: formData.get('mandi') as string,
    })
  }

  const mandis = [
    'Achalpur', 'Ahmednagar', 'Ahmedpur', 'Akhadabalapur', 'Akkalkot',
    'Akluj', 'Akola', 'Akole', 'Akot', 'Alibagh', 'Amalner',
    'Amarawati', 'Amrawati(Frui & Veg. Market)', 'Anajngaon',
    'Ashti(Karanja)', 'Aurad Shahajani', 'Ausa', 'Balapur', 'Baramati',
    'Barshi', 'Barshi(Vairag)', 'Beed', 'Bhandara', 'Bhokar',
    'Bhusaval', 'Chakur', 'Chalisgaon', 'Chandrapur(Ganjwad)',
    'Chandur Bazar', 'Chandur Railway', 'Chandvad', 'Chopada',
    'Devala', 'Dhamngaon-Railway', 'Dharangaon', 'Dharni', 'Dhule',
    'Dindori', 'Dindori(Vani)', 'Dondaicha', 'Dondaicha(Sindhkheda)',
    'Dound', 'Dudhani', 'Gangakhed', 'Gevrai', 'Ghoti', 'Hinganghat',
    'Hingna', 'Hingoli', 'Hingoli(Kanegoan Naka)', 'Indapur',
    'Islampur', 'Jalgaon', 'Jalgaon(Masawat)', 'Jamkhed', 'Junnar',
    'Junnar(Alephata)', 'Junnar(Narayangaon)', 'Junnar(Otur)', 'Kada',
    'Kaij', 'Kalmeshwar', 'Kalvan', 'Kalyan', 'Kamthi', 'Karad',
    'Karjat', 'Karjat(Raigad)', 'Karmala', 'Katol', 'Khed(Chakan)',
    'Kille Dharur', 'Kolhapur', 'Kopargaon', 'Kurdwadi',
    'Kurdwadi(Modnimb)', 'Lasalgaon', 'Lasalgaon(Niphad)',
    'Lasalgaon(Vinchur)', 'Latur',
    'Laxmi Sopan Agriculture Produce Marketing Co Ltd', 'Loha',
    'Lonand', 'Majalgaon', 'Malegaon',
    'Malharshree Farmers Producer Co Ltd', 'Manchar', 'Mangal Wedha',
    'Mangaon', 'Mankamneshwar Farmar Producer CoLtd Sanchalit Mank',
    'Manmad', 'Manwat', 'Morshi', 'Mumbai', 'Murtizapur', 'Murud',
    'Nagpur', 'Nampur', 'Nanded', 'Nandgaon', 'Nandgaon Khandeshwar',
    'Nandurbar', 'Nasik', 'Navapur', 'Newasa', 'Newasa(Ghodegaon)',
    'Nilanga', 'Nira(Saswad)',
    'Om Chaitanya Multistate Agro Purpose CoOp Society', 'Pachora',
    'Palghar', 'Palus', 'Pandharpur', 'Panvel', 'Parali Vaijyanath',
    'Parbhani', 'Parner', 'Parola', 'Patan', 'Pathardi', 'Pathari',
    'Patur', 'Pen', 'Phaltan', 'Pimpalgaon',
    'Pimpalgaon Baswant(Saykheda)',
    'Pratap Nana Mahale Khajgi Bajar Samiti', 'Pulgaon', 'Pune',
    'Pune(Khadiki)', 'Pune(Manjri)', 'Pune(Moshi)', 'Pune(Pimpri)',
    'Purna', 'Rahata', 'Rahuri', 'Rahuri(Songaon)', 'Rahuri(Vambori)',
    'Ramtek', 'Ratnagiri (Nachane)', 'Raver', 'Sakri', 'Sangamner',
    'Sangli', 'Sangli(Phale, Bhajipura Market)', 'Satana', 'Satara',
    'Savner', 'Selu', 'Shahada', 'Shevgaon', 'Shevgaon(Bodhegaon)',
    'Shirpur', 'Shirur',
    'Shivsiddha Govind Producer Company Limited Sanchal',
    'Shree Rameshwar Krushi Market', 'Shree Sairaj Krushi Market',
    'Shree Salasar Krushi Bazar', 'Shrigonda', 'Shrigonda(Gogargaon)',
    'Shrirampur', 'Shrirampur(Belapur)', 'Sindi(Selu)', 'Sinner',
    'Solapur', 'Sonpeth', 'Tadkalas', 'Tasgaon', 'Telhara', 'Tumsar',
    'Ulhasnagar', 'Umared', 'Umrane', 'Vadgaonpeth', 'Vaduj', 'Vai',
    'Varud(Rajura Bazar)', 'Vasai', 'Vashi New Mumbai', 'Vita',
    'Wardha', 'Yawal', 'Yeola'
  ]

  const crops = ['Onion', 'Potato', 'Rice', 'Tomato', 'Wheat']

  return (
    <div className="bg-gradient-to-br from-green-100 to-emerald-200 rounded-xl p-6 mb-6">
      <div className="flex items-center gap-2 mb-5">
        <TrendingUp className="text-green-700" size={20} />
        <h2 className="text-lg font-semibold text-green-800">{t('price.analyzerTitle')}</h2>
      </div>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
        <div>
          <label className="block text-xs uppercase text-gray-600 font-semibold mb-2 tracking-wide">
            {t('price.selectCrop')}
          </label>
          <select 
            name="crop"
            className="w-full px-4 py-3 bg-gray-300 text-gray-800 rounded-lg border-none outline-none focus:ring-2 focus:ring-green-500"
            defaultValue="Wheat"
          >
            {crops.map(crop => (
              <option key={crop} value={crop}>{crop}</option>
            ))}
          </select>
        </div>

        <div className="md:col-span-2">
          <label className="block text-xs uppercase text-gray-600 font-semibold mb-2 tracking-wide">
            {t('price.selectMandi')}
          </label>
          <select 
            name="mandi"
            className="w-full px-4 py-3 bg-gray-300 text-gray-800 rounded-lg border-none outline-none focus:ring-2 focus:ring-green-500"
            defaultValue="Pune"
          >
            {mandis.map(mandi => (
              <option key={mandi} value={mandi}>{mandi}</option>
            ))}
          </select>
        </div>

        <div>
          <button 
            type="submit"
            className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors flex items-center justify-center gap-2"
          >
            <TrendingUp size={18} />
            {t('price.predictPrices')}
          </button>
        </div>
      </form>
    </div>
  )
}

export default ProfitAnalyzer
