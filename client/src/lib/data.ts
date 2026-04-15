import type { GalleryImage, Testimonial, TeamMember, Service } from '../types'

export const galleryImages: GalleryImage[] = [
  { id: 1, src: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=800&q=80', alt: 'Beach wedding ceremony with tropical flowers', category: 'weddings' },
  { id: 2, src: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=800&q=80', alt: 'Elegant corporate gala with chandeliers', category: 'corporate' },
  { id: 3, src: 'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=800&q=80', alt: 'Luxury wedding reception table setting', category: 'weddings' },
  { id: 4, src: 'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=800&q=80', alt: 'Colorful celebration with confetti', category: 'social' },
  { id: 5, src: 'https://images.unsplash.com/photo-1478146059778-26028b07395a?w=800&q=80', alt: 'Fundraiser gala event with elegant decor', category: 'galas' },
  { id: 6, src: 'https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?w=800&q=80', alt: 'Romantic wedding couple at sunset', category: 'weddings' },
  { id: 7, src: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&q=80', alt: 'Corporate event networking reception', category: 'corporate' },
  { id: 8, src: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=800&q=80', alt: 'Festive social gathering with string lights', category: 'social' },
  { id: 9, src: 'https://images.unsplash.com/photo-1505236858219-8359eb29e329?w=800&q=80', alt: 'Elegant floral centerpiece arrangement', category: 'weddings' },
  { id: 10, src: 'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=800&q=80', alt: 'Grand gala with dramatic lighting', category: 'galas' },
  { id: 11, src: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=800&q=80', alt: 'Tropical wedding bouquet', category: 'weddings' },
  { id: 12, src: 'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=800&q=80', alt: 'Business conference main stage', category: 'corporate' },
  { id: 13, src: 'https://images.unsplash.com/photo-1496337589254-7e19d01cec44?w=800&q=80', alt: 'Birthday celebration with gold decor', category: 'social' },
  { id: 14, src: 'https://images.unsplash.com/photo-1510076857177-7470076d4098?w=800&q=80', alt: 'Charity gala dinner setup', category: 'galas' },
  { id: 15, src: 'https://images.unsplash.com/photo-1520854221256-17451cc331bf?w=800&q=80', alt: 'Beachside wedding arch with flowers', category: 'weddings' },
  { id: 16, src: 'https://images.unsplash.com/photo-1587825140708-dfaf18c4f4d4?w=800&q=80', alt: 'Award ceremony corporate event', category: 'corporate' },
  { id: 17, src: 'https://images.unsplash.com/photo-1504196606672-aef5c9cefc92?w=800&q=80', alt: 'Dance floor celebration', category: 'social' },
  { id: 18, src: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=800&q=80', alt: 'Outdoor gala under the stars', category: 'galas' },
  { id: 19, src: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&q=80', alt: 'Wedding reception at golden hour', category: 'weddings' },
  { id: 20, src: 'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=800&q=80', alt: 'Conference keynote presentation', category: 'corporate' },
  { id: 21, src: 'https://images.unsplash.com/photo-1527529482837-4698179dc6ce?w=800&q=80', alt: 'Cocktail party celebration', category: 'social' },
  { id: 22, src: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&q=80', alt: 'Luxury gala dining experience', category: 'galas' },
  { id: 23, src: 'https://images.unsplash.com/photo-1522413452208-996ff3f3e740?w=800&q=80', alt: 'Tropical destination wedding', category: 'weddings' },
  { id: 24, src: 'https://images.unsplash.com/photo-1429962714451-bb934ecdc4ec?w=800&q=80', alt: 'Live music at social event', category: 'social' },
]

export const testimonials: Testimonial[] = [
  {
    id: 1,
    quote: "You're Invited turned our dream beach wedding into a reality beyond anything we imagined. From the ceremony on the sand at Bahia Mar to the reception under the stars along the Intracoastal, every single detail was perfect. Our guests are still talking about it months later.",
    name: 'Sofia & Daniel Martinez',
    eventType: 'Wedding',
    eventDate: 'November 2024',
    rating: 5,
  },
  {
    id: 2,
    quote: "We hired You're Invited for our annual corporate gala and the results were extraordinary. The venue transformation, the attention to our brand aesthetics, and the seamless coordination — it was the most impressive event our company has ever hosted in Fort Lauderdale.",
    name: 'James Richardson',
    eventType: 'Corporate Gala',
    eventDate: 'September 2024',
    rating: 5,
  },
  {
    id: 3,
    quote: "Isabella's quinceañera was a dream come true thanks to the incredible team at You're Invited. The garden butterfly theme was executed flawlessly — the floral installations, the choreography coordination, the cake — everything was magical. They treated our family like their own.",
    name: 'Carolina Reyes',
    eventType: 'Quinceañera',
    eventDate: 'August 2024',
    rating: 5,
  },
  {
    id: 4,
    quote: "Our New Year's Eve party was the event of the season, and it's all thanks to this amazing team. The Gatsby theme came alive with every gold detail, the jazz band was phenomenal, and the champagne tower was the showstopper. Truly unforgettable.",
    name: 'David & Rachel Goldstein',
    eventType: 'Social Celebration',
    eventDate: 'December 2024',
    rating: 5,
  },
  {
    id: 5,
    quote: "Planning a three-day destination wedding with guests from four countries felt impossible until we found You're Invited. They handled every logistic — from hotel blocks to welcome dinners on Las Olas — with grace and expertise. Worth every penny.",
    name: 'Priya & Arjun Patel',
    eventType: 'Destination Wedding',
    eventDate: 'February 2025',
    rating: 5,
  },
  {
    id: 6,
    quote: "The custom invitation suite You're Invited designed for our wedding was a work of art. Hand-painted florals, gold foil, a custom wax seal — our guests said it was the most beautiful invitation they'd ever received. It set the tone for the entire celebration.",
    name: 'Margaret & Thomas Chen',
    eventType: 'Wedding Invitations',
    eventDate: 'March 2025',
    rating: 5,
  },
]

export const teamMembers: TeamMember[] = [
  {
    name: 'Noelle',
    title: 'Founder, Planner & Designer',
    bio: 'The creative heart behind You\'re Invited. Noelle is a planner, designer, and detail-lover who believes great events start with a great first impression. Inspired by South Florida\'s vibrant energy and laid-back elegance, she mixes creativity with organization to create events that are stylish, seamless, and full of heart.',
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&q=80',
  },
]

export const services: Service[] = [
  {
    id: 'invitations',
    title: 'Custom Invitation Design & Printing',
    description: 'From save-the-dates to the final thank-you, we design and print custom invitations and paper goods that set the tone for your event. Our designs are tailored to your style, professionally printed, and thoughtfully curated to feel just as special as the celebration itself.',
    tiers: ['Save-the-Dates', 'Full Invitation Suites', 'Day-Of Paper Goods'],
    image: 'https://images.unsplash.com/photo-1607344645866-009c320b63e0?w=800&q=80',
  },
  {
    id: 'full-service',
    title: 'Full-Service Event Planning',
    description: 'Perfect for clients who want it all handled. We oversee the planning process from start to finish, including design direction, vendor sourcing, budgeting, timelines, and on-site management.',
    tiers: ['Design Direction', 'Vendor Sourcing', 'On-Site Management'],
    image: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=800&q=80',
  },
  {
    id: 'partial',
    title: 'Partial Planning',
    description: 'Already started but need expert support? We step in to refine your plans, tie up loose ends, and make sure nothing falls through the cracks.',
    tiers: ['Plan Review', 'Vendor Coordination', 'Detail Refinement'],
    image: 'https://images.unsplash.com/photo-1478146059778-26028b07395a?w=800&q=80',
  },
  {
    id: 'day-of',
    title: 'Day-Of / Month-Of Coordination',
    description: 'You plan the vision — we make sure it actually happens. We manage final details, vendors, and the event timeline so you can stay present and enjoy every moment.',
    tiers: ['Timeline Management', 'Vendor Management', 'Day-Of Execution'],
    image: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=800&q=80',
  },
  {
    id: 'design-styling',
    title: 'Event Design & Styling',
    description: 'We bring your vision to life through thoughtful design, cohesive aesthetics, and elevated details. From color palettes to layout and decor direction, every element works together beautifully.',
    tiers: ['Color & Mood Direction', 'Decor Sourcing', 'On-Site Styling'],
    image: 'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=800&q=80',
  },
  {
    id: 'social',
    title: 'Social & Milestone Events',
    description: 'Birthdays, bridal showers, baby showers, anniversaries, and celebrations "just because." If it\'s worth celebrating, we\'re in.',
    tiers: ['Consultation', 'Day-Of Coordination', 'Full Planning'],
    image: 'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=800&q=80',
  },
]

export const invitationTypes = [
  {
    id: 'wedding',
    title: 'Wedding Suites',
    description: 'Complete invitation suites including save-the-dates, formal invitations, RSVP cards, detail cards, menus, programs, and thank-you notes. Every piece designed to tell your love story.',
    image: 'https://images.unsplash.com/photo-1607344645866-009c320b63e0?w=800&q=80',
    features: ['Custom illustration & calligraphy', 'Letterpress & foil stamping', 'Wax seals & ribbon details', 'Envelope liners & custom stamps'],
  },
  {
    id: 'corporate',
    title: 'Corporate & Gala',
    description: 'Sophisticated invitations that reflect your brand identity. From black-tie gala invitations to product launch announcements, designed to command attention and set the tone for your event.',
    image: 'https://images.unsplash.com/photo-1586075010923-2dd4570fb338?w=800&q=80',
    features: ['Brand-aligned design', 'Multi-event series packages', 'VIP & tiered invitation sets', 'Digital companion designs'],
  },
  {
    id: 'social',
    title: 'Social & Milestone',
    description: 'Birthday milestones, quinceañeras, mitzvahs, anniversaries, baby showers — every celebration deserves an invitation that excites guests before they even arrive.',
    image: 'https://images.unsplash.com/photo-1513542789411-b6a5d4f31634?w=800&q=80',
    features: ['Custom themes & illustrations', 'Photo integration', 'Bilingual designs', 'Matching party stationery'],
  },
  {
    id: 'digital',
    title: 'Digital Invitations',
    description: 'Modern, animated digital invitations perfect for today\'s connected world. Beautiful designs that land right in your guests\' inboxes and phones — with built-in RSVP tracking.',
    image: 'https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=800&q=80',
    features: ['Animated & interactive designs', 'RSVP tracking & guest management', 'Social media-ready formats', 'Matching digital stationery suite'],
  },
]

export const workshopTypes = [
  {
    id: 'letterpress',
    title: 'Letterpress & Print Workshop',
    description: 'A hands-on studio experience in Fort Lauderdale where you\'ll learn the art of letterpress printing, foil stamping, and fine paper crafting. Walk away with your own set of custom-printed invitations.',
    format: 'In-Person',
    location: 'Fort Lauderdale Studio',
    duration: '3 hours',
    capacity: '8 students',
    image: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=800&q=80',
  },
  {
    id: 'calligraphy',
    title: 'Modern Calligraphy Essentials',
    description: 'Learn the foundational strokes of modern calligraphy and how to apply them to invitation addressing, place cards, and decorative elements. All materials provided — just bring your creativity.',
    format: 'In-Person',
    location: 'Fort Lauderdale Studio',
    duration: '2.5 hours',
    capacity: '10 students',
    image: 'https://images.unsplash.com/photo-1455390582262-044cdead277a?w=800&q=80',
  },
  {
    id: 'digital-design',
    title: 'Digital Invitation Design',
    description: 'Master the tools and techniques for creating stunning digital invitations. From layout principles to animation basics, you\'ll learn to design professional-quality digital invites from scratch.',
    format: 'Online',
    location: 'Live via Zoom',
    duration: '2 hours',
    capacity: '20 students',
    image: 'https://images.unsplash.com/photo-1626785774573-4b799315345d?w=800&q=80',
  },
  {
    id: 'wax-seal',
    title: 'Wax Seal & Finishing Touches',
    description: 'The details make the difference. Learn the art of wax sealing, ribbon styling, envelope assembly, and all the finishing techniques that transform a simple invitation into a keepsake.',
    format: 'In-Person',
    location: 'Fort Lauderdale Studio',
    duration: '2 hours',
    capacity: '8 students',
    image: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=800&q=80',
  },
]

export const pressLogos = [
  'Sun Sentinel',
  'Florida Travel + Life',
  'The Knot',
  'Brides Magazine',
  'South Florida Business Journal',
  'Fort Lauderdale Magazine',
]
