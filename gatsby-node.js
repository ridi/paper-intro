const path = require('path');

async function createPages({ graphql, actions, reporter }) {
  const accessoryTemplate = path.resolve(
    __dirname,
    'src/templates/AccessoryDetail.tsx',
  );
  const accessoryIndexTemplate = path.resolve(
    __dirname,
    'src/templates/AccessoryIndex.tsx',
  );
  const stockistTemplate = path.resolve(
    __dirname,
    'src/templates/Stockists.tsx',
  );
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
  const accessorySlugs = result.data.accessories.edges.map(
    ({ node }) => node.slug,
  );
  for (const slug of accessorySlugs) {
    actions.createPage({
      path: `/accessories/${slug}/`,
      component: accessoryTemplate,
      context: {
        slug,
      },
    });
  }

  for (const forTab of ['ridipaper4', 'ridipaper']) {
    actions.createPage({
      path: `/accessories/${forTab}/`,
      component: accessoryIndexTemplate,
      context: {
        forTab,
      },
    });
  }
  actions.createRedirect({
    fromPath: '/accessories/paper-pro/',
    toPath: '/accessories/ridipaper/',
    redirectInBrowser: true,
    isPermanent: true,
  });
  actions.createRedirect({
    fromPath: '/accessories/',
    toPath: '/accessories/ridipaper/',
    redirectInBrowser: true,
  });
  const stockistSlugs = result.data.stockists.edges.map(
    ({ node }) => node.slug,
  );
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
    toPath: '/stockists/ridipaper4/',
    redirectInBrowser: true,
  });
  actions.createRedirect({
    fromPath: '/pro.html',
    toPath: '/',
    redirectInBrowser: true,
    isPermanent: true,
  });
  actions.createRedirect({
    fromPath: '/pro/',
    toPath: '/',
    redirectInBrowser: true,
    isPermanent: true,
  });
  actions.createRedirect({
    fromPath: '/stockists/paper-pro/',
    toPath: '/stockists/ridipaper/',
    redirectInBrowser: true,
    isPermanent: true,
  });
  actions.createRedirect({
    fromPath: '/intro',
    toPath: '/',
    redirectInBrowser: true,
    isPermanent: true,
  });
  actions.createRedirect({
    fromPath: '/Intro',
    toPath: '/',
    redirectInBrowser: true,
    isPermanent: true,
  });
}

module.exports = {
  createPages,
};
