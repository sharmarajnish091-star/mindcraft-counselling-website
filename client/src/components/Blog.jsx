import React, { useState } from 'react';
import { FiClock, FiArrowRight, FiX, FiCalendar, FiUser } from 'react-icons/fi';

const blogPosts = [
  {
    id: 1,
    category: 'Mental Health',
    title: '5 Signs You Should Talk to a Counsellor',
    excerpt: 'Recognising when you need professional support is the first step toward healing. Here are five clear indicators that it may be time to seek help.',
    readTime: '4 min read',
    date: 'Feb 2026',
    image: '🧠',
    content: `Mental health is just as important as physical health, yet many of us hesitate to seek professional help. Here are five signs that talking to a counsellor could benefit you:

**1. Persistent Feelings of Sadness or Anxiety**
If you've been feeling low, anxious, or overwhelmed for more than two weeks, it's not just a "phase." These persistent emotions can signal underlying issues that benefit from professional guidance.

**2. Difficulty Managing Daily Tasks**
When getting out of bed, going to work, or maintaining relationships feels like an insurmountable challenge, it's a sign that something deeper needs attention.

**3. Changes in Sleep or Appetite**
Sleeping too much or too little, overeating or loss of appetite — these physical changes often reflect emotional distress that your body is trying to communicate.

**4. Withdrawing from People You Love**
If you find yourself pulling away from friends, family, or activities you once enjoyed, isolation can be both a symptom and a cause of worsening mental health.

**5. Feeling Stuck or Hopeless**
When you can't see a way forward or feel like nothing will ever change, a counsellor can help you find new perspectives and coping strategies.

**Remember:** Seeking help is a sign of strength, not weakness. At MindCraft Counselling Services, we provide a safe, non-judgmental space for you to explore your thoughts and feelings. Your first step toward healing starts with a conversation.`
  },
  {
    id: 2,
    category: 'Relationships',
    title: 'How Couple Therapy Can Strengthen Your Bond',
    excerpt: 'Couple therapy isn\'t just for relationships in crisis. Discover how it can help you and your partner build deeper understanding and communication.',
    readTime: '5 min read',
    date: 'Feb 2026',
    image: '💑',
    content: `Many couples wait until their relationship is in serious trouble before considering therapy. But couple therapy can be transformative at any stage of a relationship.

**Breaking Communication Barriers**
One of the most common issues couples face is poor communication. Therapy provides tools to express needs clearly, listen actively, and understand your partner's perspective without judgment.

**Understanding Attachment Styles**
Each person brings their own attachment style into a relationship. Understanding whether you or your partner leans anxious, avoidant, or secure can revolutionise how you relate to each other.

**Navigating Life Transitions Together**
Marriage, parenthood, career changes, relocation — these milestones can strain even the strongest relationships. A therapist helps you navigate these changes as a team.

**Rebuilding Trust**
Whether it's after infidelity, financial disagreements, or repeated broken promises, rebuilding trust is possible with professional guidance and commitment from both partners.

**The MindCraft Approach**
At MindCraft Counselling Services, we use evidence-based approaches including CBT and family systems therapy to help couples rediscover their connection. Every relationship has the potential to grow stronger.`
  },
  {
    id: 3,
    category: 'Wellness',
    title: 'Managing Anxiety: Practical Tips That Actually Work',
    excerpt: 'Anxiety doesn\'t have to control your life. Here are evidence-based strategies you can start using today to manage anxious thoughts.',
    readTime: '6 min read',
    date: 'Jan 2026',
    image: '🌿',
    content: `Anxiety is one of the most common mental health concerns worldwide. While it's a normal human emotion, chronic anxiety can significantly impact your quality of life. Here are practical, evidence-based strategies:

**The 5-4-3-2-1 Grounding Technique**
When anxiety strikes, engage your senses: identify 5 things you can see, 4 you can touch, 3 you can hear, 2 you can smell, and 1 you can taste. This brings you back to the present moment.

**Box Breathing**
Breathe in for 4 counts, hold for 4, exhale for 4, hold for 4. This simple technique activates your parasympathetic nervous system and calms the fight-or-flight response.

**Challenge Your Thoughts**
Ask yourself: "Is this thought based on facts or feelings?" "What would I tell a friend thinking this?" Cognitive restructuring is a core CBT technique that helps reframe anxious thinking patterns.

**Limit Stimulants and Screen Time**
Caffeine and excessive social media consumption can worsen anxiety. Try reducing both and notice the difference in your baseline anxiety levels.

**Movement and Nature**
Even a 20-minute walk in nature has been shown to reduce cortisol levels significantly. Regular physical activity is one of the most effective natural anxiety reducers.

**When to Seek Professional Help**
If anxiety is interfering with your daily life, relationships, or work, professional support can make a meaningful difference. Techniques like CBT and NLP, which we practice at MindCraft, are highly effective for anxiety management.`
  },
  {
    id: 4,
    category: 'Career',
    title: 'Career Confusion? How Counselling Can Help You Find Direction',
    excerpt: 'Feeling lost in your career? Career counselling goes beyond aptitude tests — it\'s about discovering what truly fulfils you.',
    readTime: '4 min read',
    date: 'Jan 2026',
    image: '🎯',
    content: `Whether you're a student choosing your first career path or a professional considering a change, career confusion is more common than you think.

**Beyond Aptitude Tests**
While aptitude assessments can be useful, true career counselling digs deeper. It explores your values, interests, personality type, and life circumstances to find paths that align with who you really are.

**Common Career Concerns We Address**
- Students overwhelmed by parental or societal expectations
- Professionals feeling burnt out or unfulfilled
- Career changers unsure of their transferable skills
- Entrepreneurs struggling with direction and confidence
- Working parents seeking better work-life balance

**The Self-Discovery Process**
Career counselling at MindCraft involves structured conversations, psychometric assessments, and guided exercises that help you understand your strengths, values, and motivations.

**Creating an Action Plan**
Once clarity emerges, we work together to create a realistic, step-by-step action plan — whether that's upskilling, networking strategies, or building confidence for interviews.

**It's Never Too Late**
Whether you're 18 or 48, it's never too late to pursue work that brings meaning to your life. With 9+ years of experience, Surbhi Sharma has guided hundreds of individuals toward fulfilling careers.`
  },
  {
    id: 5,
    category: 'Parenting',
    title: 'Why Every Parent Should Understand Child Psychology',
    excerpt: 'Understanding how your child thinks and feels can transform your parenting approach and strengthen your family bond.',
    readTime: '5 min read',
    date: 'Jan 2026',
    image: '👨‍👩‍👧',
    content: `Parenting is one of the most rewarding yet challenging roles in life. Understanding basic child psychology can make a world of difference.

**Developmental Stages Matter**
Children think and process emotions differently at each age. What looks like "bad behaviour" in a toddler is often age-appropriate exploration. Knowing what's normal at each stage reduces parental anxiety.

**The Power of Emotional Validation**
Instead of saying "Don't cry" or "It's not a big deal," try "I can see you're upset. Do you want to tell me about it?" Emotional validation teaches children that their feelings matter and are manageable.

**Setting Boundaries with Empathy**
Children need both boundaries and warmth. The authoritative parenting style — firm but loving — is consistently shown by research to produce the best outcomes for children's emotional development.

**Screen Time and Mental Health**
Excessive screen time has been linked to anxiety, attention issues, and sleep problems in children. Creating healthy digital boundaries early sets the foundation for balanced technology use.

**When to Seek Family Therapy**
If you're noticing persistent behavioural changes, academic struggles, social withdrawal, or family conflict, family therapy can provide tools for the whole family to communicate and connect better.

**At MindCraft**, we offer both individual child counselling and family therapy sessions. Surbhi Sharma's expertise in clinical psychology means your family receives evidence-based, compassionate support.`
  }
];

const Blog = () => {
  const [selectedPost, setSelectedPost] = useState(null);

  const openPost = (post) => {
    setSelectedPost(post);
    document.body.style.overflow = 'hidden';
  };

  const closePost = () => {
    setSelectedPost(null);
    document.body.style.overflow = '';
  };

  return (
    <section id="blog" className="blog">
      <div className="container">
        <div className="section-header">
          <span className="section-label">Insights & Resources</span>
          <h2 className="section-title">Mental Wellness Blog</h2>
          <p className="section-subtitle">
            Expert insights, practical tips, and guidance to support your mental health journey
          </p>
        </div>

        <div className="blog-grid">
          {blogPosts.map((post) => (
            <article key={post.id} className="blog-card" onClick={() => openPost(post)}>
              <div className="blog-card-image">
                <span className="blog-card-emoji">{post.image}</span>
                <span className="blog-card-category">{post.category}</span>
              </div>
              <div className="blog-card-content">
                <h3 className="blog-card-title">{post.title}</h3>
                <p className="blog-card-excerpt">{post.excerpt}</p>
                <div className="blog-card-meta">
                  <span className="blog-card-date">
                    <FiCalendar size={12} /> {post.date}
                  </span>
                  <span className="blog-card-read-time">
                    <FiClock size={12} /> {post.readTime}
                  </span>
                </div>
                <span className="blog-card-link">
                  Read More <FiArrowRight size={14} />
                </span>
              </div>
            </article>
          ))}
        </div>

        {/* Article Modal */}
        {selectedPost && (
          <div className="blog-modal-overlay" onClick={closePost}>
            <div className="blog-modal" onClick={(e) => e.stopPropagation()}>
              <button className="blog-modal-close" onClick={closePost}>
                <FiX size={20} />
              </button>
              <div className="blog-modal-header">
                <span className="blog-modal-category">{selectedPost.category}</span>
                <h2 className="blog-modal-title">{selectedPost.title}</h2>
                <div className="blog-modal-meta">
                  <span><FiUser size={13} /> Surbhi Sharma</span>
                  <span><FiCalendar size={13} /> {selectedPost.date}</span>
                  <span><FiClock size={13} /> {selectedPost.readTime}</span>
                </div>
              </div>
              <div className="blog-modal-body">
                {selectedPost.content.split('\n\n').map((paragraph, index) => {
                  if (paragraph.startsWith('**') && paragraph.endsWith('**')) {
                    return <h3 key={index} className="blog-modal-subheading">{paragraph.replace(/\*\*/g, '')}</h3>;
                  }
                  if (paragraph.includes('**')) {
                    const parts = paragraph.split(/\*\*(.*?)\*\*/g);
                    return (
                      <p key={index}>
                        {parts.map((part, i) => i % 2 === 1 ? <strong key={i}>{part}</strong> : part)}
                      </p>
                    );
                  }
                  if (paragraph.startsWith('- ')) {
                    return (
                      <ul key={index} className="blog-modal-list">
                        {paragraph.split('\n').map((item, i) => (
                          <li key={i}>{item.replace('- ', '')}</li>
                        ))}
                      </ul>
                    );
                  }
                  return <p key={index}>{paragraph}</p>;
                })}
              </div>
              <div className="blog-modal-cta">
                <p>Need professional support? We're here to help.</p>
                <a href="#contact" className="btn btn-primary" onClick={closePost}>
                  Book a Session <FiArrowRight />
                </a>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Blog;
