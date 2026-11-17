export interface NavLink {
  name: string;
  href: string;
  active?: boolean;
  hasDropdown?: boolean;
  children?: NavLink[];
}

export interface NavButtonObject {
  text: string;
  href?: string;
  icon?: string;
  type?: string;
}

export type NavButton = string | NavButtonObject;

export interface HeaderData {
  logo: string;
  logoAlt?: string;
  phone: string;
  phoneHref?: string;
  button?: NavButton;
  links: NavLink[];
}

export interface HeroButton {
  text: string;
  href: string;
  icon?: string;
}

export interface HeroData {
  backgroundImage: string;
  palmLogo?: string;
  stars: number;
  headingLine1: string;
  headingLine2: string;
  buttons: {
    primary: HeroButton;
    secondary: HeroButton;
  };
}

export interface AboutFeature {
  icon: string;
  line1: string;
  line2: string;
}

export interface AboutImages {
  main: string;
  topRight: string;
  bottomRight: string;
  alt?: string;
}

export interface AboutData {
  eyebrow: string;
  headingPart1: string;
  headingPart2: string;
  headingHighlight: string;
  description: string;
  features: AboutFeature[];
  images: AboutImages;
}

export interface WhyChooseUsFeature {
  title: string;
  description: string;
  icon: string;
}

export interface WhyChooseUsStat {
  value: string;
  label: string;
  icon: string;
}

export interface WhyChooseUsData {
  eyebrow: string;
  headingLine1: string;
  headingLine2: string;
  headingHighlight: string;
  features: WhyChooseUsFeature[];
  stats: WhyChooseUsStat[];
  image: string;
  alt?: string;
}

export interface TestimonialItem {
  id?: string;
  name: string;
  role: string;
  avatar: string;
  quote: string;
  rating: number;
}

export interface TestimonialData {
  eyebrow: string;
  headingPart1: string;
  headingHighlight: string;
  backgroundImage?: string;
  items: TestimonialItem[];
}

export interface FAQItem {
  id?: string;
  question: string;
  answer: string;
}

export interface FAQData {
  eyebrow: string;
  headingPart1: string;
  headingHighlight: string;
  image: string;
  alt?: string;
  items: FAQItem[];
}

export interface TopbarData {
  location: string;
  timing: string;
  phone: string;
  email: string;
}

export interface FooterLinkItem {
  name: string;
  href: string;
}

export interface FooterContact {
  title: string;
  phone: string;
  phoneHref?: string;
  email: string;
  emailHref?: string;
  address: string;
}

export interface FooterSocialItem {
  platform: string;
  href: string;
  icon: string;
}

export interface FooterColumn {
  title: string;
  links: FooterLinkItem[];
}

export interface FooterData {
  brand: {
    logo: string;
    logoAlt?: string;
    brandName?: string;
    brandTagline?: string;
    description: string;
  };
  quickLinks: FooterColumn;
  more: FooterColumn;
  contact: FooterContact;
  followUs: {
    title: string;
    socials: FooterSocialItem[];
  };
  bottomBar: {
    copyright: string;
  };
}

export interface VideoBannerData {
  eyebrow: string;
  heading: string;
  backgroundImage: string;
  youtubeVideoId: string;
  youtubeUrl?: string;
}

export interface ContactInquiryBox {
  badgeText: string;
  phone: string;
  phoneHref: string;
}

export interface ContactFormConfig {
  namePlaceholder: string;
  emailPlaceholder: string;
  checkInPlaceholder: string;
  checkOutPlaceholder: string;
  messagePlaceholder: string;
  buttonText: string;
}

export interface ContactData {
  eyebrow: string;
  heading: string;
  image: string;
  alt?: string;
  inquiryBox: ContactInquiryBox;
  form: ContactFormConfig;
}

export interface RoomItem {
  id: string;
  title: string;
  price: string;
  priceUnit: string;
  stars: number;
  image: string;
  alt?: string;
}

export interface RoomsData {
  eyebrow: string;
  heading: string;
  description: string;
  rooms: RoomItem[];
}

export interface AmenityCTA {
  text: string;
  href: string;
}

export interface AmenityItem {
  id: string;
  number: string;
  title: string;
  icon: string;
  image: string;
  alt?: string;
  descriptionPoints: string[];
  cta: AmenityCTA;
}

export interface AmenityPhoneBox {
  badgeText: string;
  phone: string;
  phoneHref: string;
}

export interface AmenitiesData {
  eyebrow: string;
  heading: string;
  phoneBox: AmenityPhoneBox;
  items: AmenityItem[];
}

export interface FacilityCard {
  id: string;
  type: "text" | "image";
  title?: string;
  description?: string;
  icon?: string;
  image?: string;
  alt?: string;
}

export interface FacilitiesData {
  eyebrow: string;
  heading: string;
  cards: FacilityCard[];
}

export interface SiteContent {
  Tour: {
    templateComponents: {
      "template-1": {
        shared: {
          Topbar: string;
          Header: string;
          Footer: string;
        };
      };
    };
    sections: {
      Header: {
        variants: {
          TourHeader1: HeaderData;
        };
      };
      Banner: {
        variants: {
          TourBanner1: HeroData;
        };
      };
      About: {
        variants: {
          TourAbout1: AboutData;
        };
      };
      Rooms?: {
        variants: {
          TourRooms1: RoomsData;
        };
      };
      Amenities?: {
        variants: {
          TourAmenities1: AmenitiesData;
        };
      };
      Facilities?: {
        variants: {
          TourFacilities1: FacilitiesData;
        };
      };
      WhyChooseUs: {
        variants: {
          TourWhyChooseUs1: WhyChooseUsData;
        };
      };
      VideoBanner?: {
        variants: {
          TourVideoBanner1: VideoBannerData;
        };
      };
      Testimonial: {
        variants: {
          TourTestimonial1: TestimonialData;
        };
      };
      FAQ: {
        variants: {
          TourFAQ1: FAQData;
        };
      };
      Contact?: {
        variants: {
          TourContact1: ContactData;
        };
      };
      Topbar: {
        variants: {
          TourTopbar1: TopbarData;
        };
      };
      Footer: {
        variants: {
          TourFooter1: FooterData;
        };
      };
    };
  };
}
