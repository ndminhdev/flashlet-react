import {
  AiOutlineBulb,
  AiOutlineDelete,
  AiOutlineLink,
  AiOutlineSearch,
  AiFillCheckCircle
} from 'react-icons/ai';
import {
  BsFillImageFill,
  BsReverseLayoutSidebarInsetReverse
} from 'react-icons/bs';
import { FcGoogle } from 'react-icons/fc';
import { ImFacebook2 } from 'react-icons/im';
import { IoCloseSharp } from 'react-icons/io5';
import { SiElasticstack } from 'react-icons/si';
import {
  HiPencil,
  HiArrowNarrowLeft,
  HiArrowNarrowRight
} from 'react-icons/hi';

const icons = {
  Google: FcGoogle,
  Facebook: ImFacebook2,
  Close: IoCloseSharp,
  Search: AiOutlineSearch,
  Image: BsFillImageFill,
  Set: BsReverseLayoutSidebarInsetReverse,
  Edit: HiPencil,
  Delete: AiOutlineDelete,
  Card: SiElasticstack,
  Write: HiPencil,
  ArrowForward: HiArrowNarrowRight,
  ArrowBack: HiArrowNarrowLeft,
  GetLink: AiOutlineLink,
  Check: AiFillCheckCircle,
  Idea: AiOutlineBulb
};

export default icons;
