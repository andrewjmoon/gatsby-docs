import React from 'react';
import Helmet from "react-helmet";
import { StaticQuery, graphql } from 'gatsby';
import AppFrame from '../components/AppFrame';
import AppTableOfContents from '../components/AppTableOfContents';
import AppContent from '../components/AppContent';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  root: {
    marginBottom: 100,
  },
  header: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-end',
  },
  markdownElement: {
    marginTop: theme.spacing.unit * 2,
    marginBottom: theme.spacing.unit * 2,
    padding: `0 ${theme.spacing.unit}px`,
  },
});


const Layout = ({ children, classes }) => (
  <StaticQuery
      query={graphql`
          query SiteTitleQuery {
              site {
                  siteMetadata {
                      title
                  }
              }
          }
      `}
      render={data => (
            <AppFrame>
              <Helmet
                  title={data.site.siteMetadata.title}
                  meta={[
                      { name: 'description', content: 'Sample' },
                      { name: 'keywords', content: 'sample, something' }
                  ]}
                  >
                  <html lang="en" />
              </Helmet>
              
              <AppContent className={classes.root}>
                <div className={classes.header}>           
                </div>
                <div>
                  {children}
                </div>
              </AppContent>
            </AppFrame>
      )}
  />
);

export default withStyles(styles)(Layout);
