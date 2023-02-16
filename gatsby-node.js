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

  const createClientRedirect = ({ fromPath, toPath, isPermanent }) => {
    const normalizedFromPath = fromPath.replace(/\/?$/, '/');
    actions.createRedirect({
      fromPath: normalizedFromPath,
      toPath,
      isPermanent,
      redirectInBrowser: true
    });

    actions.createRedirect({
      fromPath: normalizedFromPath.slice(0, -1),
      toPath,
      isPermanent,
      redirectInBrowser: true
    });
  };

  const ACTIVE_DEVICES = [
    { landingSlug: 'ridipaper4', slug: 'ridipaper4' }
  ];

  const DISCONTINUED_DEVICES = [
    { landingSlug: 'ridipaper', slug: 'ridipaper' },
    { landingSlug: 'pro', slug: 'paper-pro' },
  ];

  const DEVICES = ACTIVE_DEVICES.map(device => ({ ...device, active: true }))
    .concat(DISCONTINUED_DEVICES.map(device => ({ ...device, active: false })));

  const MAIN_DEVICE = ACTIVE_DEVICES[0];

  // Create /accessories/:device
  for (const device of DEVICES) {
    if (device.active) {
      actions.createPage({
        path: `/accessories/${device.slug}/`,
        component: accessoryIndexTemplate,
        context: { forTab: device.slug },
      });
    } else {
      createClientRedirect({
        fromPath: `/accessories/${device.slug}/`,
        toPath: `/accessories/${MAIN_DEVICE.slug}/`,
        isPermanent: true,
      });
    }
  }

  // Create /accessories/:accessory
  const accessorySlugs = result.data.accessories.edges.map(
    ({ node }) => node.slug,
  );

  for (const accessorySlug of accessorySlugs) {
    const isActive = ACTIVE_DEVICES.some(({ slug }) => accessorySlug.startsWith(slug));
    if (isActive) {
      actions.createPage({
        path: `/accessories/${accessorySlug}/`,
        component: accessoryTemplate,
        context: { slug: accessorySlug },
      });
    } else {
      createClientRedirect({
        fromPath: `/accessories/${accessorySlug}/`,
        toPath: `/accessories/${MAIN_DEVICE.slug}/`,
        isPermanent: true,
      });
    }
  }

  // Create /accessories/
  createClientRedirect({
    fromPath: '/accessories/',
    toPath: `/accessories/${MAIN_DEVICE.slug}/`,
  });

  // Create /stockists/:stockist
  const stockistSlugs = result.data.stockists.edges.map(
    ({ node }) => node.slug,
  );

  for (const stockistSlug of stockistSlugs) {
    const isActive = ACTIVE_DEVICES.some(({ slug }) => slug === stockistSlug);
    if (isActive) {
      actions.createPage({
        path: `/stockists/${stockistSlug}/`,
        component: stockistTemplate,
        context: { slug: stockistSlug },
      });
    } else {
      createClientRedirect({
        fromPath: `/stockists/${stockistSlug}/`,
        toPath: `/stockists/${MAIN_DEVICE.slug}/`,
        redirectInBrowser: true,
        isPermanent: true,
      });
    }
  }

  // Create /stockists/
  createClientRedirect({
    fromPath: '/stockists/',
    toPath: `/stockists/${MAIN_DEVICE.slug}/`,
  });

  // Create /:discontinued-device
  for (const device of DISCONTINUED_DEVICES) {
    createClientRedirect({
      fromPath: `/${device.landingSlug}/`,
      toPath: `/`,
      redirectInBrowser: true,
      isPermanent: true,
    });
  }

  // Create Legacy Redirects
  const legacyPaths = ['/intro', '/Intro', '/pro.html'];
  for (const legacyPath of legacyPaths) {
    createClientRedirect({
      fromPath: legacyPath,
      toPath: '/',
      redirectInBrowser: true,
      isPermanent: true,
    });
  }
}

module.exports = {
  createPages,
};
