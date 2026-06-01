import img1  from './WhatsApp Image 2026-06-01 at 09.04.41.jpeg';
import img2  from './WhatsApp Image 2026-06-01 at 09.04.43.jpeg';
import img3  from './WhatsApp Image 2026-06-01 at 09.04.43 (1).jpeg';
import img4  from './WhatsApp Image 2026-06-01 at 09.04.43 (2).jpeg';
import img5  from './WhatsApp Image 2026-06-01 at 09.04.43 (3).jpeg';
import img6  from './WhatsApp Image 2026-06-01 at 09.04.43 (4).jpeg';
import img7  from './WhatsApp Image 2026-06-01 at 09.04.43 (5).jpeg';
import img8  from './WhatsApp Image 2026-06-01 at 09.04.43 (6).jpeg';
import img9  from './WhatsApp Image 2026-06-01 at 09.04.43 (8).jpeg';
import img10 from './WhatsApp Image 2026-06-01 at 09.04.43 (9).jpeg';
import img11 from './WhatsApp Image 2026-06-01 at 09.04.43 (10).jpeg';
import img12 from './WhatsApp Image 2026-06-01 at 09.04.43 (11).jpeg';
import img13 from './WhatsApp Image 2026-06-01 at 09.04.43 (12).jpeg';
import img14 from './WhatsApp Image 2026-06-01 at 09.04.43 (13).jpeg';
import img15 from './WhatsApp Image 2026-06-01 at 09.04.43 (14).jpeg';
import img16 from './WhatsApp Image 2026-06-01 at 09.04.44.jpeg';
import img17 from './WhatsApp Image 2026-06-01 at 09.04.44 (1).jpeg';
import img18 from './WhatsApp Image 2026-05-31 at 20.08.05.jpeg';
import img19 from './WhatsApp Image 2026-05-31 at 20.08.05 (1).jpeg';
import img20 from './WhatsApp Image 2026-05-31 at 20.08.11.jpeg';
import img21 from './WhatsApp Image 2026-05-31 at 20.08.12.jpeg';
import img22 from './WhatsApp Image 2026-05-31 at 20.08.12 (1).jpeg';
import img23 from './WhatsApp Image 2026-05-31 at 20.08.15.jpeg';
import img24 from './WhatsApp Image 2026-05-31 at 20.08.15 (1).jpeg';
import img25 from './WhatsApp Image 2026-05-31 at 20.08.16.jpeg';
import img26 from './WhatsApp Image 2026-05-31 at 20.08.16 (1).jpeg';
import img27 from './WhatsApp Image 2026-05-31 at 20.08.20.jpeg';
import img28 from './WhatsApp Image 2026-05-31 at 20.08.20 (1).jpeg';
import img29 from './WhatsApp Image 2026-05-31 at 20.08.20 (2).jpeg';
import img30 from './WhatsApp Image 2026-05-31 at 20.08.21.jpeg';
import img31 from './WhatsApp Image 2026-05-31 at 20.08.21 (1).jpeg';
import img32 from './WhatsApp Image 2026-05-31 at 20.08.21 (2).jpeg';
import img33 from './WhatsApp Image 2026-05-31 at 20.08.22.jpeg';
import img34 from './WhatsApp Image 2026-05-31 at 20.08.22 (1).jpeg';
import img35 from './WhatsApp Image 2026-05-31 at 20.08.22 (2).jpeg';
import img36 from './WhatsApp Image 2026-05-31 at 20.08.23.jpeg';
import img37 from './WhatsApp Image 2026-05-31 at 20.08.23 (1).jpeg';
import img38 from './WhatsApp Image 2026-06-01 at 09.31.36.jpeg';
import img39 from './WhatsApp Image 2026-06-01 at 09.31.36 (1).jpeg';
import img40 from './WhatsApp Image 2026-06-01 at 09.32.58.jpeg';
import img41 from './WhatsApp Image 2026-06-01 at 09.32.58 (1).jpeg';
import vid1  from './WhatsApp Video 2026-05-31 at 20.08.07.mp4';
import vid2  from './WhatsApp Video 2026-05-31 at 20.08.08.mp4';
import vid3  from './WhatsApp Video 2026-05-31 at 20.08.14.mp4';
import vid4  from './WhatsApp Video 2026-05-31 at 20.08.19.mp4';

const img = (src) => ({ src, type: 'image' });
const vid = (src) => ({ src, type: 'video' });

export const galleryItems = [
  img(img1),  img(img2),  img(img3),  img(img4),  img(img5),
  img(img6),  img(img7),  img(img8),  vid(vid1),  vid(vid2),
  img(img9),  img(img10), img(img11), img(img12), img(img13),
  img(img14), img(img15), img(img16), img(img17), vid(vid3),
  img(img18), img(img19), img(img20), img(img21), img(img22),
  img(img23), img(img24), img(img25), img(img26), img(img27),
  img(img28), img(img29), img(img30), img(img31), img(img32),
  img(img33), img(img34), img(img35), img(img36), img(img37),
  img(img38), img(img39), img(img40), img(img41),
  vid(vid4),
];

// backward-compat: plain src array for anything that still needs it
export const galleryImages = galleryItems.map((i) => i.src);
