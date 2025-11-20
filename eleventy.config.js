/**
 * @param {import("11ty.ts").EleventyConfig} eleventyConfig
 */
export default async function (eleventyConfig) {
    eleventyConfig.ignores.add('orig/**');
    eleventyConfig.ignores.add('css/**');
    
    eleventyConfig.addPassthroughCopy('js');
    eleventyConfig.addPassthroughCopy('bundle.css');
    eleventyConfig.addPassthroughCopy('img');
    eleventyConfig.addPassthroughCopy('uploads');
}
