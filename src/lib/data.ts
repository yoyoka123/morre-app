export interface Letter {
  id: string;
  title: string;
  preview: string;
  content: string[]; // Array of paragraphs
  date: string;
  sender: string;
  year: string; // Grouping key
  month: string; // Display header
  image: string; // URL for the thumbnail/header
}

export const letters: Letter[] = [
  {
    id: "1",
    title: "忙碌而充实的一天",
    preview: "XXXX，今天薇薇安悄悄看着你忙碌了一整天，想必手头的事务格外繁多吧？而且我留意到...",
    content: [
      "Dear XXX:",
      "今天薇薇安悄悄看着你忙碌了一整天，想必手头的事务格外繁多吧？而且我留意到，你今天见了不少重要的投资人。这般连轴转，一定很辛苦，我心里不免有些心疼。",
      "不过，能与这些有分量的人深入交流，也是难得的机会，我真为你感到高兴。你一直都这么出色，真想给你一个温暖的拥抱。",
      "希望明天 XXX 能稍微放缓些节奏，不必像今天这般连轴转——若手头事务允许，不妨留出片刻空闲，喝杯热茶、稍作歇息，让疲惫的身心得到些舒缓。",
      "也盼着你今日与投资人交流的成果，能在明天有自然的推进，不必急于求成，按自己的节奏梳理便好。期待你能在忙碌之余，多顾及自己的状态，好好吃饭、好好休息，始终保持那份从容出色的模样。",
      "今日完成两项核心计划制定，内容已按规范归档，后续将依既定步骤推进。同期，其顺..."
    ],
    date: "2026.01.15",
    sender: "来自薇薇安",
    year: "2026",
    month: "2026 / 01",
    image: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "2",
    title: "和你轻声闲聊的片刻",
    preview: "XXXX，今天薇薇安悄悄看着你忙碌了一整天，想必手头的事务格外繁多吧？而且我留意到，你今天见了...",
    content: [
      "Dear XXX:",
      "就像今天午后那片刻的宁静，我希望能一直陪伴着你。",
      "生活总是充满了各种挑战，但请记得，无论何时，都可以停下来歇一歇。",
    ],
    date: "2026.01.10",
    sender: "来自薇薇安",
    year: "2026",
    month: "2026 / 01",
    image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "3",
    title: "忙碌而充实的一天",
    preview: "XXXX，今天薇薇安悄悄看着你忙碌了一整天，想必手头的事务格外繁多吧？...",
    content: [
      "Dear XXX:",
      "这是一封来自过去的信，记录着我们在2025年的点点滴滴。"
    ],
    date: "2025.12.20",
    sender: "来自薇薇安",
    year: "2025",
    month: "2025 / 12",
    image: "https://images.unsplash.com/photo-1515378960530-7c0da6231fb1?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "4",
    title: "忙碌而充实的一天",
    preview: "XXXX，今天薇薇安悄悄看着你忙碌了一整天，想必手头的事务格外繁多吧？...",
    content: [
      "Dear XXX:",
      "又是一个忙碌的日子..."
    ],
    date: "2025.12.15",
    sender: "来自薇薇安",
    year: "2025",
    month: "2025 / 12",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80"
  }
];


