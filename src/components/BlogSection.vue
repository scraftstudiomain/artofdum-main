<script setup lang="ts">
interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  date: string;
}

const posts: BlogPost[] = [
  {
    id: 1,
    title: 'The Story Behind Our Signature Dumplings',
    excerpt:
      'A behind-the-scenes look at the techniques and traditions that shape our most-loved dumplings.',
    date: '2025-09-15',
  },
  {
    id: 2,
    title: 'Tea Pairings: Finding the Perfect Balance',
    excerpt:
      'How we pair fragrant teas with rich, savory flavors to elevate your dining experience.',
    date: '2025-08-28',
  },
  {
    id: 3,
    title: 'From Kitchen to Table: Our Seasonal Ingredients',
    excerpt:
      'Meet the local growers and discover what makes our seasonal menu shine.',
    date: '2025-07-10',
  },
];
</script>

<template>
  <section class="pt-32 pb-20 sm:pt-40 sm:pb-32 bg-background">
    <div class="container mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center mb-12">
        <h1 class="font-serif text-5xl md:text-7xl font-bold text-text">Blog</h1>
        <p class="mt-4 text-lg text-text-muted max-w-2xl mx-auto">
          Stories from our kitchen, traditions we cherish, and tips to try at home.
        </p>
      </div>

      <div class="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        <article
          v-for="post in posts"
          :key="post.id"
          class="group border border-white/10 rounded-xl overflow-hidden hover:border-gold/40 transition-colors"
          v-motion
          :initial="{ opacity: 0, y: 30 }"
          :enter="{ opacity: 1, y: 0, transition: { duration: 600, ease: 'easeOut' } }"
        >
          <div class="p-6">
            <p class="text-sm uppercase tracking-widest font-sans text-text-muted">{{ new Date(post.date).toLocaleDateString() }}</p>
            <h2 class="mt-2 font-serif text-2xl text-text group-hover:text-gold transition-colors">
              {{ post.title }}
            </h2>
            <p class="mt-3 text-text-muted">{{ post.excerpt }}</p>
            <router-link
              :to="{ name: 'Blog' }"
              class="mt-6 inline-block font-sans font-medium tracking-widest uppercase text-sm border-b border-text text-text hover:border-gold hover:text-gold transition-colors"
            >
              Read More
            </router-link>
          </div>
        </article>
      </div>
    </div>
  </section>
  
</template>


