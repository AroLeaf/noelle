import { PrefixCommand, PrefixCommandOptionType } from '@aroleaf/djs-bot';
import DME from 'discord-markdown-embeds';

const messages = {
  general: DME.render(`
    ---
    color: 0xe17f93
    ---

    # Support Recommendations
    Generally, there are two types of teammates recommended for Noelle:
    
    - Those providing buffs and/or energy directly to Noelle. Common recommendations are **Gorou and Zhongli**. Others, such as Geo MC, Yun Jin, and Candace, are also **situationally** decent options.
    - Those who does significant off-field damage and sometimes buffs and/or energy as well. Common recommendations include **Albedo, Fischl, Xingqiu and Yelan**. Others such as Yae and Beidou are also **situationally** good options.
    
    Characters not listed here are not generally recommended; please ask in <#787242744741232672> if you want to know the specifics of a certain character.

    # Battery Support
    The best batteries are Ningguang at C2 or higher, and Geo MC, with the ability to solo battery Noelle at average ER (~130%).
    Albedo, Ningguang at C0, or Zhongli can work if you will get a lot of energy particles from elsewhere (Thresholds/Fav weapons), or you have high ER (170+%).
  `).messages()[0],

  yunjin: DME.render(`
    ---
    color: 0xb07ba0
    thumbnail: 'https://cdn.discordapp.com/attachments/787242744170938386/1042088192817500210/unknown.png'
    author:
      name: Yunjin
      url: 'https://keqingmains.com/noelle/#Supports_Analysis'
    footer: 'Last updated: Genshin ver. 3.2'
    ---

    **This command is a modified excerpt from the full KQM Noelle Guide.**

    A Liyue opera performer with impressive flourish, Yun Jin provides off-field Flat DMG that scales with the Normal Attacker’s DMG% and CRIT stats rather than her own. For additional details on how her Flat DMG works, check out the KQM Yun Jin guide.

    To judge Yun Jin’s usefulness in Noelle teams, it is important to acknowledge that as a buff source for individual hits of Noelle’s Normal Attacks, she can provide an impressive increase in damage often around a few thousand. For the purpose of “doing the most visible damage on Noelle”, she is therefore a great pick. However, similar to other direct buffs such as Bennett and Mona, Yun Jin does not meaningfully contribute damage on her own, neither does her buff affects other teammates, and since Noelle is generally not as much of a “hyper-carry” as other more “meta” characters, this means that, for the purpose of “dealing the most overall damage as a team”, the value of buffing Noelle’s damage can be worse than simply using another off-field character who does a lot of damage. In this regards, Yun Jin is only a passable choice as a support if players have access to better off-field damage dealers such as Fischl or Yelan.

    It is also worth noting that given her stacks, Yun Jin performs best when you can just about exhaust most if not all of her 30 fstacks, which is most likely to happen when there’re two or three targets. In single-target or 4+ target situations, her stacks will be used less/too fast and therefore leading to lower damage dealt per target.

    While her hold version of Skill gives more energy and damage, it is generally advised to only Tap Skill (or perfect Counter) to avoid wasting field time. Do note that her Burst does not snapshot, which means Gorou’s flat DEF buff will only affect her when she’s on-field, but the 25% bonus from his A1 will still apply.
    
    # Pros
    + Low Cooldown Skill for batterying (C1)
    + Can proc Geo Resonance in a shielder-less team
    + Strong Geo applications on Skill and Burst, making elemental shield breaking easier
    + Cool Counter mechanics
    + Good at visibly increasing Noelle’s damage
    + Perfectly usable at C0, with C2 & C6 being decent upgrades

    # Cons
    - Overall damage contribution is lower than alternatives due to low stack use from Noelle’s slow attacks, especially in single target scenarios
    - Less beneficial Ascension 4 passive in a Geo team, but not a major concern
    - Lacks good weapon choices; high refinement Favonius Lance is highly recommended
    - Prefers 4 Husk in a Noelle team, although she can use leftover pieces from Noelle/Albedo. Balancing stats among ER, DEF and CRIT Rate can be difficult

    ![banner](https://media.discordapp.net/attachments/787242744170938386/1042088192419057734/unknown.png)
  `).messages()[0],

  yae: DME.render(`
    ---
    color: 0xd9747c
    thumbnail: 'https://media.discordapp.net/attachments/787242744170938386/1042091591881461810/unknown.png'
    author: Yae Miko
    footer: 'Last updated: Genshin ver. 3.2'
    ---

    **This command is a new section written by #Markoda5294.**

    The fried tofu loving fox lady with absolutely no untold secret, Yae Miko is generally seem as a more damage-oriented but very energy hungry and more restricted variant of Fischl. For Noelle, her skill taking up longer field time to cast is a major downside, and she generates less energy than Fischl as well, rendering her generally a weaker choice. 

    # Pros
    + Generally higher raw damage, especially with more constellations 
    + Strong frontloaded burst damage
    + Turrets have big ranges

    # Cons 
    - Skill generates less energy and takes some field time to cast
    - Burst energy cost of 90 is untenable in a Noelle team, so it’s used very infrequently.

    ![banner](https://media.discordapp.net/attachments/787242744170938386/1042091591566897193/unknown.png)
  `).messages()[0],

  candace: DME.render(`
    ---
    color: 0x6d8ac0
    thumbnail: 'https://media.discordapp.net/attachments/787242744170938386/1042097428553269258/unknown.png'
    author: Candace
    footer: 'Last updated: Genshin ver. 3.2'
    ---

    **This command is a new section written by #Markoda5294.**

    The stewardly guardian of Aaru Village, Candace is another Normal Attack-focused support with relatively low personal damage. When built, she can reasonably provide 35-40% NA DMG% bonus that will make Noelle’s visible damage noticeably better and, unlike Yun Jin, does not have a stack limit and thus scale well in AoE. Similar to Yun Jin, however, Candance is a pure stats support, and so for the purpose of dealing the most damage in a Noelle team, other off-field damage dealer such as Fischl and Yelan are often better. Given her own personal ER need, she is bound to use the Favonius Lance and often ER sand + Crit rate circlet as well. 

    # Pros
    + Strong normal attack bonuses to visibly improve Noelle’s damage
    + Amount of total HP does not affect her buff value as much as other characters such as Yun Jin, since the base value is 20%.

    # Cons
    - Overall damage contribution is lower than alternatives due to low stack use from Noelle’s slow attacks, especially in single target scenarios 
    - Low personal damage, only slightly improved by C6
    - High ER needs on Noelle team
    - Prefers high refinement for Favonious Lance

    ![banner](https://media.discordapp.net/attachments/787242744170938386/1042097160193310832/unknown.png)
  `).messages()[0],

  zhongli: DME.render(`
    ---
    color: 0x6a5749
    thumbnail: 'https://media.discordapp.net/attachments/787242744170938386/1042083703872036895/unknown.png'
    author:
      name: Zhongli
      url: 'https://keqingmains.com/noelle/#Supports_Analysis'
    footer: 'Last updated: Genshin ver. 3.2'
    ---

    **This command is a modified excerpt from the full KQM Noelle Guide.**

    The CEO of Geo, Zhongli is an all-in-one battery, shielder and, since he can opt for offensive builds here, a decent off-field DPS when built. While none of these traits is very good on its own, Zhongli’s value here lies in how much you can translate his many functionalities into DPS. Overall, the sheer versatility of his kit deserves a recommendation.

    # Pros
    + Provides Geo Resistance Shred (usually ~9.5% increase for all Geo damage)
    + Provides 100% shield uptime (for Geo Resonance)
    + Burst can be used for dealing with elemental shields and brief crowd control. If C2, his burst also can do significant damage without causing team DPS loss.
    + Decent off-field battery when pillar(s) can reliably hit enemies. 
    + Has unique playstyle revolved around his pillar resonance
    + Flexible build choices
    + Near invincibility when paired with Noelle

    # Cons
    - RNG Energy generation, and the pillar has short range, so energy generation can be very bad situationally. 
    - Using Burst is a DPS loss until C2
    - Does not offer good off-field DPS at C0 and/or without Geo constructs to resonate with
    - Pillar might cause accidental climbing. Not elegance.

    ![banner](https://media.discordapp.net/attachments/787242744170938386/1042083703473590302/unknown.png)
  `).messages()[0],

  yelan: DME.render(`
    ---
    color: 0x43529c
    thumbnail: 'https://media.discordapp.net/attachments/787242744170938386/1042099278904053851/unknown.png'
    author: Yelan
    footer: 'Last updated: Genshin ver. 3.2'
    ---

    **This command is a new section written by #Markoda5294.**

    The mysterious lurker in the shadow, Yelan is an impressive top-tier entry to Noelle’s teammate list. Often dubbed the “five-star Xingqiu”, Yelan offers higher raw hydro damage and a very sizable damage bonus at the cost of slightly weaker hydro application and higher ER needs. These drawbacks are completely negated in Noelle’s team, as Noelle only requires occasional hydro application to create crystalize shields for Geo Resonance uptime and Yelan’s compatibility with the Favonius Warbow and the Emblem of Severed Fate set means her ER need can be reasonably managed without much harm to her damage due to her kit being HP-scaling. On her own, Yelan is already an amazing flex slot choice for triple geo teams, but her further synergy with Xingqiu and Hydro resonance pushes the hydro duo to the peak of Noelle team damage. As a single-target off-field damage dealer, Yelan necessarily falls off more in AoE situations, but her pure prowess will still shine bright in tandem with Noelle’s naturally good AoE performance.

    # Pros
    + Amazing off-field hydro damage
    + Strong passive damage bonus buff to Noelle, which also can be timed well with shield pop
    + Favonius Warbow is naturally best weapons since she does not care about weapon base ATK, the ER passive is strong, and also helps batterying Noelle
    + Burst is dynamic, so buffs such as Petra can be applied more easily
    + Pairs even better when paired with Xingqiu

    # Cons 
    - Damage is single-target only
    - Prefers some refinements on Favonious Warbow for consistency
    - Noelle must Normal Attack and not spin
    - May gain more value on other teams

    ![banner](https://media.discordapp.net/attachments/787242744170938386/1042099279440920727/unknown.png)
  `).messages()[0],

  ningguang: DME.render(`
    ---
    color: 0xf6ecab
    thumbnail: 'https://media.discordapp.net/attachments/787242744170938386/1042086955871109130/unknown.png'
    author:
      name: Ningguang
      url: 'https://keqingmains.com/noelle/#Supports_Analysis'
    footer: 'Last updated: Genshin ver. 3.2'
    ---

    **This command is a modified excerpt from the full KQM Noelle Guide.**

    The mighty lady Tianquan of Liyue, Ningguang is a good battery at C2 with a decent Geo DMG% buff and is best used as a Burst DPS to handle single target fights in a dual-carry playstyle. However, this is very likely sub-optimal in terms of overall team damage since her high field time requirement will eat into Noelle’s Burst uptime and field time to attack, which means less Noelle damage. As a pure battery, her clunky 6s cooldown in her C2 also makes her less intuitive to use for funneling.

    ![banner](https://media.discordapp.net/attachments/787242744170938386/1042086955430723604/unknown.png)
  `).messages()[0],

  bennett: DME.render(`
    ---
    color: 0xb9453b
    thumbnail: 'https://media.discordapp.net/attachments/787242744170938386/1042092573218574386/unknown.png'
    author:
      name: Bennett
      url: 'https://keqingmains.com/noelle/#Supports_Analysis'
    footer: 'Last updated: Genshin ver. 3.2'
    ---

    **This command is a modified excerpt from the full KQM Noelle Guide.**

    The hapless adventurer with an upbeat attitude, Bennett is a pure ATK buffer and sometimes elemental shield breaker in a Noelle team. For Noelle’s personal damage, he is a comparable choice to pre-C6 Gorou, especially if she is also pre-C6; the less ATK and more DMG% you have, the better Bennett’s buff becomes. Bennett can also buff any other ATK-scaling snapshotting off-field DPS like Fischl. However, his personal ER requirement will be very high if he does not take more field time to use his Skill more, which will take away Noelle’s Burst uptime and field time.

    As a pure support, Bennett is best suited for strong hypercarries who scale well with buffs, since he does not do much damage himself. However, Noelle is less of a hypercarry than other popular characters and especially does not work the best with ATK buffs. For the purpose of “doing the most visible damage on Noelle”, Bennett is still a fine choice; however, he makes for a very poor choice if the goal is to maximize Noelle team’s overall damage, where better off-field damage dealers such as Fischl and Yelan are often far superior. 


    # Pros
    + Strong ATK buff to Noelle and other ATK-scaling off-field DPSes
    + Strong shield breaker against Cryo and Electro

    # Cons
    - High healing potential is wasted when Noelle already heals well
    - Has high personal ER requirement as the sole pyro in team with low field time
    - The ATK buff is less effective on Noelle than traditional ATK-scaling carries
    - Nearly no personal damage as a support
    - Usually gains more value on other teams

    ![banner](https://media.discordapp.net/attachments/787242744170938386/1042092572849488023/unknown.png)
  `).messages()[0],

  fischl: DME.render(`
    ---
    color: 0x775bc9
    thumbnail: 'https://media.discordapp.net/attachments/787242744170938386/1042080396625575996/unknown.png'
    author:
      name: Fischl
      url: 'https://keqingmains.com/noelle/#Supports_Analysis'
    footer: 'Last updated: Genshin ver. 3.2'
    ---

    **This command is a modified excerpt from the full KQM Noelle Guide.**

    The Chunni talking bird summoner, Fischl mirrors Albedo’s functionalities as a strong off-field DPS with good battery capability while taking very little field time, making her one of the strongest off-element slot choices in single targets. Her damage contribution will fall off in AoE cases, but she will remain a reliable choice.

    # Pros
    + Excellent single-target off-field damage
    + Takes very little field time
    + Consistent off-field particles to help battery Noelle
    + Help sustain Geo Resonance uptime through reliably providing Crystalize shields

    # Cons
    - Batterying capability and damage are weaker without C6
    - Damage does not scale up in AoE scenarios
    - Usually gains more value on other teams

    ![banner](https://media.discordapp.net/attachments/787242744170938386/1042080396315201616/unknown.png)
  `).messages()[0],

  beidou: DME.render(`
    ---
    color: 0x9276bb
    thumbnail: 'https://media.discordapp.net/attachments/787242744170938386/1042090844708151368/unknown.png'
    author:
      name: Beidou
      url: 'https://keqingmains.com/noelle/#Supports_Analysis'
    footer: 'Last updated: Genshin ver. 3.2'
    ---

    **This command is a modified excerpt from the full KQM Noelle Guide.**

    The slayer of ocean demons, Beidou is a powerful AoE variant of Fischl with excellent off-field DPS in two-or-more targets scenarios. However, her high energy requirement usually calls for another Electro teammate as battery, reducing the team flexibility for Noelle. Furthermore, Beidou’s damage falls off dramatically in single-target fights as well, making her a situational choice.

    # Pros
    + Very high multi-target off-field damage, especially for two targets
    + Her burst works with Charge Attacks, making spinning an effective playstyle

    # Cons 
    - Very high ER requirement, which often forces her to be paired with Fischl 
    - Reliant on good Counters to reduce ER need, which may be difficult to master
    - If Noelle only uses Normal Attacks, her Burst produces fewer discharges due to slower attacks
    - Much weaker in single-target fights

    ![banner](https://media.discordapp.net/attachments/787242744170938386/1042090844364222494/unknown.png)
  `).messages()[0],

  emc: DME.render(`
    ---
    color: 0x756bca
    thumbnail: 'https://media.discordapp.net/attachments/787242744170938386/1042093123288965261/unknown.png'
    author:
      name: Electro MC
      url: 'https://keqingmains.com/noelle/#Supports_Analysis'
    footer: 'Last updated: Genshin ver. 3.2'
    ---

    **This command is a modified excerpt from the full KQM Noelle Guide.**

    Electro MC is the strongest single-target battery in game, but contributes nothing else useful. Therefore, they do not outcompete Geo MC, who, besides providing a lot of Geo energy, also buffs the team and does noticeable personal damage. Nevertheless, EMC pales in terms of achieving the overall best team damage, they do basically solve ER issue on Noelle, which can make casual playing experience with Noelle outside of abyss more enjoyable.

    ![banner](https://media.discordapp.net/attachments/787242744170938386/1042093122970189925/unknown.png)
  `).messages()[0],

  mona: DME.render(`
    ---
    color: 0x9ba3ce
    thumbnail: 'https://media.discordapp.net/attachments/787242744170938386/1042093776618926190/unknown.png'
    author:
      name: Mona Megistus
      url: 'https://keqingmains.com/noelle/#Supports_Analysis'
    footer: 'Last updated: Genshin ver. 3.2'
    ---

    **This command is a modified excerpt from the full KQM Noelle Guide.**

    Mona’s presence indicates that you’re just going for the Damage per Screenshot. There’s not much else she offers besides the Omen bonus for a mere 5 seconds and Thrilling Tales, then provides nothing for a long time while struggling to get her burst back up. S-tier hat though.

    # Pros
    + Strong DMG% buff (and ATK% with TTDS) for a short period

    # Cons
    - Very high personal ER need
    - Omen duration is short
    - Very low damage contribution

    ![banner](https://media.discordapp.net/attachments/787242744170938386/1042093776195305512/unknown.png)
  `).messages()[0],

  albedo: DME.render(`
    ---
    color: 0x41426b
    thumbnail: 'https://media.discordapp.net/attachments/787242744170938386/1042082276055461929/unknown.png'
    author:
      name: Albedo
      url: 'https://keqingmains.com/noelle/#Supports_Analysis'
    footer: 'Last updated: Genshin ver. 3.2'
    ---

    **This command is a modified excerpt from the full KQM Noelle Guide.**

    The White Chalk Prince born from Alchemy, Albedo is simply the best Geo off-field DPS, giving high payoff for almost no field time taken. His direct synergy with Gorou, Noelle’s best support, is the cherry on top that cements his usage wherever possible.

    # Pros
    + Takes very little field time
    + Respectable off-field DPS
    + The best off-field Geo battery
    + Only Skill is necessary to level
    + Accessible weapon choices
    + Pairs amazingly with Gorou

    # Cons
    - RNG Energy generation
    - Flower is often destroyed/displaced by large enemies, which is annoying
    - Requires 4 Husk, therefore lengthening you stay in the Husk Domain
    - Flower might cause accidental lifting

    ![banner](https://media.discordapp.net/attachments/787242744170938386/1042082275732492388/unknown.png)
  `).messages()[0],

  gorou: DME.render(`
    ---
    color: 0xbc843c
    thumbnail: 'https://media.discordapp.net/attachments/787242744170938386/1042081233783488552/unknown.png'
    author:
      name: Gorou
      url: 'https://keqingmains.com/noelle/#Supports_Analysis'
    footer: 'Last updated: Genshin ver. 3.2'
    ---

    **This command is a modified excerpt from the full KQM Noelle Guide.**

    The trusty General of the Watatsumi Island, Gorou is the definitive DEF-scaling Geo support and the best teammate choice when playing triple/mono Geo teams. He provides a good level of batterying when paired with an R4+ Favonius Warbow. Because he does little personal damage, he can freely use the 4 Exile set to lower team ER requirements. Even without his C6, his buff is comparable if not superior to a similarly invested Bennett’s, has 100% uptime, and also applies to Albedo if present. Generally, use his Burst then Skill to funnel the Energy into Noelle, unless there is another battery for Noelle already.

    # Pros
    + Strong DEF, Geo DMG%, and Crit DMG% (if C6) buff
    + Low Cooldown Skill for batterying (C1)
    + Does not require high investment into artifact sets and Talent levels
    + Usable at C0, and becomes unparalleled at Geo buffs at C6

    # Cons
    - Negligible personal damage
    - Not suitable for double Geo teams
    - Prefers high refinement of Favonius Bow to sustain his and Noelle’s energy
    - Less effective for pre-C6 Noelle

    ![banner](https://media.discordapp.net/attachments/787242744170938386/1042081233292767312/unknown.png)
  `).messages()[0],

  xingqiu: DME.render(`
    ---
    color: 0x61b0e8
    thumbnail: 'https://media.discordapp.net/attachments/787242744170938386/1042095871145287680/unknown.png'
    author:
      name: Xingqiu
      url: 'https://keqingmains.com/noelle/#Supports_Analysis'
    footer: 'Last updated: Genshin ver. 3.2'
    ---

    **This command is a modified excerpt from the full KQM Noelle Guide.**

    The successor to the Guhua-style martial arts, Xingqiu’s well-known versatility as a damage dealer + damage reduction + micro healing + abundant hydro application is sadly reduced to his single-target off-field DPS for Noelle, similar to Fischl. Unlike Fischl, however, he has higher ER needs on his own and generally deals lower damage when unsupported, and his batterying capacity for Noelle is also worse. While usable, a lone Xingqiu is usually a weaker pick for the flex slot than Fischl. 

    However, this completely changes with the introduction of Yelan. When paired with Yelan, both characters’ ER needs are greatly reduced, while Xingqiu’s constellation 2 further enhances Yelan’s damage, making the duo + Noelle + Albedo the strongest known Noelle team where Noelle still does significant damage on her own. 

    # Pros
    + Good off-field hydro damage
    + Burst is dynamic, so buffs such as Petra can be applied more easily
    + Pairs well with Yelan, especially with his C2 and C6

    # Cons
    - Energy-hungry when he’s the sole Hydro
    - Damage is single-target only
    - Noelle must Normal Attack and not spin
    - Usually gains a lot more value on other teams

    ![banner](https://media.discordapp.net/attachments/787242744170938386/1042095870549700678/unknown.png)
  `).messages()[0],

  gmc: DME.render(`
    ---
    color: 0xbf9f56
    thumbnail: 'https://media.discordapp.net/attachments/787242744170938386/1042085274903138324/unknown.png'
    author:
      name: Geo MC
      url: 'https://keqingmains.com/noelle/#Supports_Analysis'
    footer: 'Last updated: Genshin ver. 3.2'
    ---

    **This command is a modified excerpt from the full KQM Noelle Guide.**

    An often forgotten choice, Geo MC is the strongest Geo battery with a 6s Cooldown Skill and supplies a decent amount of personal damage, making them a reliable choice. However, the numerous Geo constructs can easily block your movement and lead to frustration, ultimately causing more harm than good if not planned around properly.

    # Pros
    + Guaranteed as your default character, with free constellations
    + The strongest Geo battery for funneling
    + Good personal damage
    + More self-sufficient on Energy with C4
    + Provides 10% CRIT Rate buff within a range
    + Synergizes with Zhongli for resonance playstyle
    + Geo constructs can be used to trap enemies 

    # Cons
    - Has 4-star level base stats despite being a 5-star
    - Skill takes practice to be placed well, otherwise it will lift up enemies
    - Geo constructs can also trap you and limit your movement

    ![banner](https://media.discordapp.net/attachments/878788560231227462/930514733545717770/i_7025_profile.png)
  `).messages()[0],
}

export default new PrefixCommand({
  name: 'supports',
  description: 'Recommended supports for Noelle.',
  args: [{
    type: PrefixCommandOptionType.STRING,
    name: 'character',
    description: 'The support character to get more information about. Leave out for general support recommendations.',
  }],
}, async (message, { args }) => {
  return message.reply(messages[args.character] || messages.general);
});