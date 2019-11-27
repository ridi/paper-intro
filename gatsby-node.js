const path = require('path');

async function createPages({ graphql, actions, reporter }) {
  const template = path.resolve(__dirname, 'src/templates/AccessoryDetail.tsx');
  const result = await graphql(`
    {
      accessories: allAccessoriesYaml {
        edges {
          node {
            slug
          }
        }
      }
    }
  `);
  if (result.errors) {
    reporter.panicOnBuild('Error while running GraphQL query.');
  }
  const slugs = result.data.accessories.edges.map(({ node }) => node.slug);
  for (const slug of slugs) {
    actions.createPage({
      path: `/accessories/${slug}/`,
      component: template,
      context: {
        slug,
      },
    });
  }
}

module.exports = {
  createPages,
};
