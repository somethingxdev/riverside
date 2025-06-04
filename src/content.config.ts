import { defineCollection, z } from 'astro:content';

import { glob } from 'astro/loaders';

const blog = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/data/posts' }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      description: z.string(),
      date: z.date(),
      cover: image()
    })
});

const products = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/data/products' }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      category: z.string(),
      externalLink: z.string().optional()
    })
});

const products_category = defineCollection({
  loader: glob({ pattern: '**/*.json', base: './src/data/products-category' }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      description: z.string(),
      cover: image()
    })
});

export const collections = { blog, products, products_category };
