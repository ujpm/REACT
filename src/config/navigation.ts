import { SvgIconComponent } from '@mui/icons-material';
import ReportProblemIcon from '@mui/icons-material/ReportProblem';
import TrackChangesIcon from '@mui/icons-material/TrackChanges';
import SecurityIcon from '@mui/icons-material/Security';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import VolunteerActivismIcon from '@mui/icons-material/VolunteerActivism';
import CampaignIcon from '@mui/icons-material/Campaign';
import HandshakeIcon from '@mui/icons-material/Handshake';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';

export type FeatureType = 'REACT' | 'ACT';

export interface NavItem {
  id: string;
  title: string;
  path: string;
  icon: SvgIconComponent;
  type: FeatureType;
  description: string;
}

export const navigationItems: NavItem[] = [
  // REACT Features
  {
    id: 'report-issue',
    title: 'Report Issue',
    path: '/report-issue',
    icon: ReportProblemIcon,
    type: 'REACT',
    description: 'AI-powered issue reporting and categorization'
  },
  {
    id: 'track-issues',
    title: 'Track Issues',
    path: '/track-issues',
    icon: TrackChangesIcon,
    type: 'REACT',
    description: 'Real-time tracking & status updates'
  },
  {
    id: 'confidential',
    title: 'Confidential Reports',
    path: '/confidential',
    icon: SecurityIcon,
    type: 'REACT',
    description: 'Secure channel for sensitive issues'
  },
  {
    id: 'trending',
    title: 'Trending Issues',
    path: '/trending',
    icon: TrendingUpIcon,
    type: 'REACT',
    description: 'Community-voted urgent concerns'
  },

  // ACT Features
  {
    id: 'volunteer',
    title: 'Volunteer & Donate',
    path: '/volunteer',
    icon: VolunteerActivismIcon,
    type: 'ACT',
    description: 'Support community projects'
  },
  {
    id: 'campaigns',
    title: 'Campaigns',
    path: '/campaigns',
    icon: CampaignIcon,
    type: 'ACT',
    description: 'Launch & join awareness initiatives'
  },
  {
    id: 'collaborate',
    title: 'Collaborate',
    path: '/collaborate',
    icon: HandshakeIcon,
    type: 'ACT',
    description: 'Partner with NGOs & government'
  },
  {
    id: 'achievements',
    title: 'Achievements',
    path: '/achievements',
    icon: EmojiEventsIcon,
    type: 'ACT',
    description: 'View rewards and recognition'
  }
];
