const path = require('path');

async function createPages({ graphql, actions, reporter }) {
  const accessoryTemplate = path.resolve(__dirname, 'src/templates/AccessoryDetail.tsx');
  const stockistTemplate = path.resolve(__dirname, 'src/templates/Stockists.tsx');
  const result = await graphql(`
    {
      accessories: allAccessoriesYaml {
        edges {
          node {
            slug
          }
        }
      }
      stockists: allStockistsYaml {
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
  const accessorySlugs = result.data.accessories.edges.map(({ node }) => node.slug);
  for (const slug of accessorySlugs) {
    actions.createPage({
      path: `/accessories/${slug}/`,
      component: accessoryTemplate,
      context: {
        slug,
      },
    });
  }
  const stockistSlugs = result.data.stockists.edges.map(({ node }) => node.slug);
  for (const slug of stockistSlugs) {
    actions.createPage({
      path: `/stockists/${slug}/`,
      component: stockistTemplate,
      context: {
        slug,
      },
    });
  }
  actions.createRedirect({
    fromPath: '/stockists/',
    toPath: '/stockists/ridipaper/',
  });
}

module.exports = {
  createPages,
};
