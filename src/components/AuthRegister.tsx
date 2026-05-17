import React, { useState } from 'react'
import { register } from '../services/authService'
import { Upload, UserCircle, CheckCircle, FileText } from 'lucide-react'

export default function AuthRegister() {
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirm, setConfirm] = useState('')
  const [role, setRole] = useState('Maman')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)

  // Champs supplémentaires
  const [city, setCity] = useState('')
  const [postalCode, setPostalCode] = useState('')
  const [hourlyRate, setHourlyRate] = useState('')
  const [bio, setBio] = useState('')
  const [avatar, setAvatar] = useState('')
  const [idCard, setIdCard] = useState('')
  const [avatarName, setAvatarName] = useState('')
  const [idCardName, setIdCardName] = useState('')
  const [phone, setPhone] = useState('')
  const [shortDescription, setShortDescription] = useState('')
  const [numberOfChildren, setNumberOfChildren] = useState('')
  const [selectedLanguages, setSelectedLanguages] = useState<string[]>([])
  const [diploma, setDiploma] = useState('')
  const [criminalRecord, setCriminalRecord] = useState('')
  const [criminalRecordName, setCriminalRecordName] = useState('')
  const [hasCriminalRecordCommitment, setHasCriminalRecordCommitment] = useState(false)
  const [hasTaxCommitment, setHasTaxCommitment] = useState(false)
  const [availabilities, setAvailabilities] = useState<Record<string, string[]>>({
    'Lundi': [], 'Mardi': [], 'Mercredi': [], 'Jeudi': [], 'Vendredi': [], 'Samedi': [], 'Dimanche': []
  })

  // Constantes pour les listes
  const LANGUAGES = ['Français', 'Anglais', 'Allemand', 'Espagnol', 'Italien', 'Arabe', 'Russe', 'Chinois', 'Autre'];
  const DIPLOMAS = [
    'Aucun diplôme spécifique',
    'CAP Petite Enfance',
    'BEP Carrières Sanitaires et Sociales',
    'BAFA',
    'Diplôme d\'État d\'Auxiliaire de Puériculture',
    'Diplôme d\'État d\'Éducateur de Jeunes Enfants',
    'Titre Professionnel d\'Assistant de Vie aux Familles (ADVF)',
    'Formation Premiers Secours (PSC1)'
  ];
  const DAYS = ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi', 'Dimanche'];
  const SLOTS = ['Matin (8h-12h)', 'Après-midi (12h-18h)', 'Soirée (18h-22h)', 'Nuit (22h-8h)'];

  const handleIdCardChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        setError("Le document est trop volumineux (max 5Mo).");
        return;
      }
      setIdCardName(file.name);
      const reader = new FileReader();
      reader.onloadend = () => {
        setIdCard(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        setError("La photo est trop volumineuse (max 5Mo).");
        return;
      }
      setAvatarName(file.name);
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatar(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCriminalRecordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        setError("Le document est trop volumineux (max 5Mo).");
        return;
      }
      setCriminalRecordName(file.name);
      const reader = new FileReader();
      reader.onloadend = () => {
        setCriminalRecord(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const toggleLanguage = (lang: string) => {
    setSelectedLanguages(prev =>
      prev.includes(lang) ? prev.filter(l => l !== lang) : [...prev, lang]
    );
  };

  const toggleAvailability = (day: string, slot: string) => {
    setAvailabilities(prev => {
      const daySlots = prev[day] || [];
      return {
        ...prev,
        [day]: daySlots.includes(slot) ? daySlots.filter(s => s !== slot) : [...daySlots, slot]
      };
    });
  };

  const getPasswordStrength = (pwd: string) => {
    if (!pwd) return 0;
    let score = 0;
    if (pwd.length >= 8) score++;
    if (/[A-Z]/.test(pwd)) score++;
    if (/[a-z]/.test(pwd)) score++;
    if (/[0-9]/.test(pwd)) score++;
    if (/[^A-Za-z0-9]/.test(pwd)) score++;
    return score;
  };

  const strength = getPasswordStrength(password);
  const strengthLabels = ['', 'Très faible', 'Faible', 'Moyen', 'Robuste', 'Excellent'];
  const strengthColors = ['', 'bg-red-500', 'bg-orange-400', 'bg-yellow-400', 'bg-blue-400', 'bg-green-500'];

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError(null)
    if (password !== confirm) return setError('Les mots de passe ne correspondent pas.')

    // Validation photo obligatoire pour MamaSitter
    if (role === 'MamaSitter' && !avatar) {
      return setError('Veuillez ajouter votre photo de profil.')
    }

    // Validation de la robustesse
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
    if (!passwordRegex.test(password)) {
      return setError('Le mot de passe doit contenir au moins 8 caractères, une majuscule, une minuscule et un chiffre.')
    }
    setLoading(true)
    const fullName = `${firstName} ${lastName}`.trim();
    try {
      await register({
        name: fullName,
        email,
        password,
        role,
        city,
        postalCode,
        hourlyRate: role === 'MamaSitter' ? Number(hourlyRate) : undefined,
        bio,
        shortDescription: role === 'MamaSitter' ? shortDescription : undefined,
        phone,
        languages: role === 'MamaSitter' ? selectedLanguages : undefined,
        diploma: role === 'MamaSitter' ? diploma : undefined,
        availabilities: role === 'MamaSitter' ? availabilities : undefined,
        avatar: avatar || undefined,
        idCard,
        criminalRecord,
        hasCriminalRecordCommitment,
        hasTaxCommitment: role === 'MamaSitter' ? hasTaxCommitment : undefined,
        childCount: role === 'Maman' ? numberOfChildren : undefined
      })
      setSuccess(true)
    } catch (err: any) {
      setError(err?.message || 'Erreur')
    } finally {
      setLoading(false)
    }
  }

  if (success) {
    return (
      <section className="min-h-screen bg-beige flex items-center justify-center px-4 pt-28 pb-12">
        <div className="w-full max-w-lg my-8">
          <div className="bg-white rounded-2xl shadow-lg p-10 text-center space-y-4">
            <img src="/images/logo-couleurs.svg" alt="MamSitter" className="h-16 w-auto mx-auto mb-2" />
            <h1 className="font-poppins font-bold text-2xl text-gray-800">Inscription réussie !</h1>
            <p className="font-lato text-gray-600">Un email de confirmation t'a été envoyé à <strong>{email}</strong>. Vérifie ta boîte de réception pour activer ton compte.</p>
            <a href="#/login" className="inline-block mt-4 px-8 py-4 bg-sable text-white font-poppins font-semibold rounded-lg hover:bg-sable/90 transition text-base">Aller à la connexion</a>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="min-h-screen bg-beige flex items-center justify-center px-4 pt-28 pb-12">
      <div className="w-full max-w-lg my-8">
        <div className="text-center mb-8">
          <img src="/images/logo-couleurs.svg" alt="MamSitter" className="h-16 w-auto mx-auto mb-4" />
          <h1 className="font-poppins font-bold text-3xl text-gray-800 mb-2">Inscription</h1>
          <p className="font-lato text-gray-500">Crée ton compte MamSitter</p>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-10 space-y-6">
          {error && (
            <div className="rounded-lg px-4 py-3 text-sm font-lato bg-red-50 text-red-700 border border-red-200">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block font-poppins font-semibold text-sm text-gray-700 mb-2">Prénom <span className="text-red-400">*</span></label>
                <input
                  type="text"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  required
                  placeholder="Votre prénom"
                  className="w-full px-5 py-4 rounded-lg border border-gray-300 focus:border-sable focus:ring-2 focus:ring-sable/20 outline-none transition font-lato text-base"
                />
              </div>
              <div>
                <label className="block font-poppins font-semibold text-sm text-gray-700 mb-2">Nom <span className="text-red-400">*</span></label>
                <input
                  type="text"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  required
                  placeholder="Votre nom"
                  className="w-full px-5 py-4 rounded-lg border border-gray-300 focus:border-sable focus:ring-2 focus:ring-sable/20 outline-none transition font-lato text-base"
                />
              </div>
            </div>
            <div>
              <label className="block font-poppins font-semibold text-sm text-gray-700 mb-2">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="exemple@email.com"
                className="w-full px-5 py-4 rounded-lg border border-gray-300 focus:border-sable focus:ring-2 focus:ring-sable/20 outline-none transition font-lato text-base"
              />
            </div>
            <div>
              <label className="block font-poppins font-semibold text-sm text-gray-700 mb-2">Mot de passe</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="8+ car., 1 maj., 1 min., 1 chif."
                className="w-full px-5 py-4 rounded-lg border border-gray-300 focus:border-sable focus:ring-2 focus:ring-sable/20 outline-none transition font-lato text-base"
              />
              {password && (
                <div className="mt-2 space-y-2">
                  <div className="flex gap-1 h-1.5 w-full bg-gray-100 rounded-full overflow-hidden">
                    {[1, 2, 3, 4, 5].map((step) => (
                      <div
                        key={step}
                        className={`h-full flex-1 transition-all duration-500 ${step <= strength ? strengthColors[strength] : 'bg-transparent'
                          }`}
                      />
                    ))}
                  </div>
                  <div className="flex justify-between items-center text-[11px] font-bold uppercase tracking-wider font-lato">
                    <span className={strength <= 2 ? 'text-red-500' : strength <= 4 ? 'text-orange-500' : 'text-green-600'}>
                      Force : {strengthLabels[strength]}
                    </span>
                    <span className="text-gray-400">
                      {strength === 5 ? 'Parfait !' : 'Ajoutez majuscules, chiffres ou symboles'}
                    </span>
                  </div>
                </div>
              )}
            </div>
            <div>
              <label className="block font-poppins font-semibold text-sm text-gray-700 mb-2">Confirmer le mot de passe</label>
              <input
                type="password"
                value={confirm}
                onChange={(e) => setConfirm(e.target.value)}
                required
                placeholder="Retapez votre mot de passe"
                className="w-full px-5 py-4 rounded-lg border border-gray-300 focus:border-sable focus:ring-2 focus:ring-sable/20 outline-none transition font-lato text-base"
              />
            </div>
            <div>
              <label className="block font-poppins font-semibold text-sm text-gray-700 mb-2">Je suis...</label>
              <div className="grid grid-cols-2 gap-4">
                <button
                  type="button"
                  onClick={() => setRole('Maman')}
                  className={`py-3 rounded-lg border-2 transition-all font-poppins font-semibold ${role === 'Maman' ? 'border-sable bg-sable/5 text-sable' : 'border-gray-200 text-gray-500 hover:border-sable/30'}`}
                >Une Maman</button>
                <button
                  type="button"
                  onClick={() => setRole('MamaSitter')}
                  className={`py-3 rounded-lg border-2 transition-all font-poppins font-semibold ${role === 'MamaSitter' ? 'border-vert bg-vert/5 text-vert' : 'border-gray-200 text-gray-500 hover:border-vert/30'}`}
                >Une MamaSitter</button>
              </div>
            </div>

            {/* Section Profil & Contact */}
            <div className="space-y-5 pt-6 border-t border-gray-100 mt-2 animate-in fade-in duration-500">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block font-poppins font-semibold text-sm text-gray-700 mb-2">Téléphone <span className="text-red-400">*</span></label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    required
                    placeholder="06 12 34 56 78"
                    className="w-full px-5 py-3 rounded-lg border border-gray-300 focus:border-sable focus:ring-2 focus:ring-sable/20 outline-none transition font-lato"
                  />
                </div>
                <div>
                  <label className="block font-poppins font-semibold text-sm text-gray-700 mb-2">Ville</label>
                  <input
                    type="text"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    placeholder="Ex: Paris"
                    className="w-full px-5 py-3 rounded-lg border border-gray-300 focus:border-sable focus:ring-2 focus:ring-sable/20 outline-none transition font-lato"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block font-poppins font-semibold text-sm text-gray-700 mb-2">Code Postal</label>
                  <input
                    type="text"
                    value={postalCode}
                    onChange={(e) => setPostalCode(e.target.value)}
                    placeholder="75001"
                    className="w-full px-5 py-3 rounded-lg border border-gray-300 focus:border-sable focus:ring-2 focus:ring-sable/20 outline-none transition font-lato"
                  />
                </div>
                {role === 'Maman' && (
                  <div>
                    <label className="block font-poppins font-semibold text-sm text-gray-700 mb-2">Nombre d'enfant(s)</label>
                    <input
                      type="text"
                      value={numberOfChildren}
                      onChange={(e) => setNumberOfChildren(e.target.value)}
                      placeholder="Ex: 2"
                      className="w-full px-5 py-3 rounded-lg border border-gray-300 focus:border-sable focus:ring-2 focus:ring-sable/20 outline-none transition font-lato"
                    />
                  </div>
                )}
                {role === 'MamaSitter' && (
                  <div>
                    <label className="block font-poppins font-semibold text-sm text-gray-700 mb-2">Tarif horaire (€)</label>
                    <input
                      type="number"
                      value={hourlyRate}
                      onChange={(e) => setHourlyRate(e.target.value)}
                      required
                      placeholder="25"
                      className="w-full px-5 py-3 rounded-lg border border-gray-300 focus:border-vert focus:ring-2 focus:ring-vert/20 outline-none transition font-lato"
                    />
                  </div>
                )}
              </div>

              {role === 'MamaSitter' && (
                <div>
                  <label className="block font-poppins font-semibold text-sm text-gray-700 mb-2">Accroche (max 70 car.)</label>
                  <input
                    type="text"
                    value={shortDescription}
                    onChange={(e) => setShortDescription(e.target.value.slice(0, 70))}
                    required
                    placeholder="Ex: Douce et expérimentée..."
                    className="w-full px-5 py-3 rounded-lg border border-gray-300 focus:border-vert focus:ring-2 focus:ring-vert/20 outline-none transition font-lato"
                  />
                </div>
              )}

              <div>
                <label className="block font-poppins font-semibold text-sm text-gray-700 mb-2">Biographie / Présentation <span className="text-red-400">*</span></label>
                <textarea
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  required
                  placeholder="Parlez-nous un peu de vous..."
                  rows={4}
                  className="w-full px-5 py-3 rounded-lg border border-gray-300 focus:border-sable focus:ring-2 focus:ring-sable/20 outline-none transition font-lato resize-none text-sm"
                />
              </div>

              {role === 'MamaSitter' && (
                <div className="space-y-5">
                  <div>
                    <label className="block font-poppins font-semibold text-sm text-gray-700 mb-3">Langues parlées</label>
                    <div className="flex flex-wrap gap-2">
                      {LANGUAGES.map(lang => (
                        <button key={lang} type="button" onClick={() => toggleLanguage(lang)} className={`px-3 py-1.5 rounded-full border text-xs font-medium transition-all ${selectedLanguages.includes(lang) ? 'bg-vert border-vert text-white shadow-sm' : 'bg-white border-gray-200 text-gray-600 hover:border-vert/50'}`}>{lang}</button>
                      ))}
                    </div>
                  </div>
                  <div>
                    <label className="block font-poppins font-semibold text-sm text-gray-700 mb-2">Diplôme</label>
                    <select value={diploma} onChange={(e) => setDiploma(e.target.value)} required className="w-full px-5 py-3 rounded-lg border border-gray-300 focus:border-vert focus:ring-2 focus:ring-vert/20 outline-none transition font-lato text-sm bg-white">
                      <option value="">Sélectionnez un diplôme...</option>
                      {DIPLOMAS.map(d => <option key={d} value={d}>{d}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="block font-poppins font-semibold text-sm text-gray-700 mb-2">Mes disponibilités</label>
                    <div className="overflow-x-auto"><table className="w-full text-xs font-lato border-collapse"><thead><tr><th className="p-1"></th>{SLOTS.map(s => <th key={s} className="p-1 font-semibold text-gray-500 overflow-hidden text-ellipsis whitespace-nowrap max-w-[50px]">{s.split(' ')[0]}</th>)}</tr></thead><tbody>{DAYS.map(day => (<tr key={day}><td className="p-1 font-semibold text-gray-700">{day.slice(0, 2)}</td>{SLOTS.map(slot => (<td key={slot} className="p-1 text-center"><button type="button" onClick={() => toggleAvailability(day, slot)} className={`w-6 h-6 rounded border transition-all ${availabilities[day]?.includes(slot) ? 'bg-vert border-vert text-white' : 'bg-white border-gray-200 text-transparent'}`}>✓</button></td>))}</tr>))}</tbody></table></div>
                  </div>
                </div>
              )}

              {/* Photo et Documents (Maintenant pour tout le monde) */}
              <div className="space-y-6 pt-4">
                <div>
                  <label className="block font-poppins font-semibold text-sm text-gray-700 mb-2">Votre photo {role === 'MamaSitter' && <span className="text-red-400">*</span>}</label>
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 rounded-full bg-gray-50 border border-gray-100 flex items-center justify-center flex-shrink-0 overflow-hidden shadow-inner">
                      {avatar ? <img src={avatar} alt="Aperçu" className="w-full h-full object-cover" /> : <UserCircle className="w-10 h-10 text-gray-200" />}
                    </div>
                    <label className="flex-grow flex items-center justify-center gap-2 px-4 py-3 bg-white border-2 border-dashed border-gray-200 rounded-xl cursor-pointer hover:border-sable/50 hover:bg-sable/5 transition-all group">
                      <Upload className="w-4 h-4 text-gray-400 group-hover:text-sable transition-colors" />
                      <span className="text-sm font-lato text-gray-500 group-hover:text-sable truncate max-w-[150px]">{avatarName || "Choisir une photo"}</span>
                      <input type="file" accept="image/*" onChange={handleAvatarChange} className="hidden" />
                    </label>
                  </div>
                </div>

                <div className="space-y-4">
                  <label className="block font-poppins font-semibold text-sm text-gray-700 mb-1">Documents de sécurité</label>
                  <p className="text-[11px] text-gray-400 font-lato leading-relaxed">Afin d’assurer la sécurité et la confiance de chacune, les mamans comme les MamaSitters fournissent une pièce d’identité lors de l’inscription.</p>
                  <div className="grid grid-cols-1 gap-3">
                    <label className="flex items-center gap-3 w-full px-5 py-3 bg-gray-50 border-2 border-dashed border-gray-200 rounded-xl cursor-pointer hover:border-sable/50 hover:bg-sable/5 transition-all group">
                      <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center shadow-sm">
                        {idCard ? <CheckCircle className="w-5 h-5 text-green-500" /> : <FileText className="w-5 h-5 text-gray-300" />}
                      </div>
                      <span className="text-xs font-poppins font-bold text-gray-700 truncate">{idCardName || "Télécharger ma pièce d'identité"}</span>
                      <input type="file" accept="image/*,.pdf" onChange={handleIdCardChange} className="hidden" />
                    </label>
                    <label className="flex items-center gap-3 w-full px-5 py-3 bg-gray-50 border-2 border-dashed border-gray-200 rounded-xl cursor-pointer hover:border-sable/50 hover:bg-sable/5 transition-all group">
                      <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center shadow-sm">
                        {criminalRecord ? <CheckCircle className="w-5 h-5 text-green-500" /> : <FileText className="w-5 h-5 text-gray-300" />}
                      </div>
                      <span className="text-xs font-poppins font-bold text-gray-700 truncate">{criminalRecordName || "Télécharger mon casier judiciaire (N°3)"}</span>
                      <input type="file" accept="image/*,.pdf" onChange={handleCriminalRecordChange} className="hidden" />
                    </label>
                  </div>

                  <label className="flex items-start gap-3 cursor-pointer group mt-4">
                    <input type="checkbox" checked={hasCriminalRecordCommitment} onChange={(e) => setHasCriminalRecordCommitment(e.target.checked)} className="mt-1 w-4 h-4 rounded border-gray-300 text-sable focus:ring-sable" />
                    <span className="text-[11px] text-gray-500 font-lato leading-tight group-hover:text-gray-700 transition-colors">Je n'ai pas encore d'extrait de casier judiciaire et je m'engage à le fournir dans les 48h.</span>
                  </label>

                  {role === 'MamaSitter' && (
                    <label className="flex items-start gap-3 cursor-pointer group">
                      <input type="checkbox" checked={hasTaxCommitment} required onChange={(e) => setHasTaxCommitment(e.target.checked)} className="mt-1 w-4 h-4 rounded border-gray-300 text-vert focus:ring-vert" />
                      <span className="text-[11px] text-gray-500 font-lato leading-tight group-hover:text-gray-700 transition-colors">Je m'engage à déclarer aux impôts l'ensemble des revenus perçus via la plateforme.</span>
                    </label>
                  )}
                </div>
              </div>
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 rounded-lg bg-vert text-white font-poppins font-semibold text-base uppercase tracking-wide hover:bg-vert/90 transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Inscription...' : "S'inscrire"}
            </button>
          </form>

          <div className="text-center pt-2">
            <p className="text-gray-500 text-sm font-lato">
              Déjà un compte ? <a href="#/login" className="text-sable font-semibold hover:underline">Se connecter</a>
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
