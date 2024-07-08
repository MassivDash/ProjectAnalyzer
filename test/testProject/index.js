import React, { useState, useEffect, useMemo, useRef } from "react";
import styled from "@emotion/styled";
import { navigate, graphql, useStaticQuery } from "gatsby";
import AniLink from "gatsby-plugin-transition-link/AniLink";
import Image from "gatsby-image";
import Scrollbar from "@components/Scroller";
import { useColorMode } from "theme-ui";
import { connect } from "react-redux";
import Logo from "@components/Logo";
import SocialLinks from "@components/SocialLinks";
import Icons from "@icons";
import mediaqueries from "@styles/media";
import bg from "./snow.png";
import More from "./More";
import { getWindowDimensions, getBreakpointFromTheme } from "@utils";

import {
  setNavigatorPosition,
  setNavigatorShape,
  setScrollToTop,
  setFontSizeIncrease,
  setCategoryFilter,
  setMobileControls,
} from "../../state/createStore";

interface Props {
  theme?: any;
  navigatorPosition: any;
  setNavigatorShape: () => void;
  navigatorShape: string;
  setMobileControls: (boolean) => void;
  mobileControlsOpen: boolean;
}

// interface NavLinksProps {
//   theme: any;
//   fade: boolean;
//   to: string;
//   navigatorPosition: any;
// }

const siteQuery = graphql`
  {
    sitePlugin: sitePlugin(name: { eq: "gatsby-theme-spaceout" }) {
      pluginOptions {
        rootPath
        basePath
      }
    }
    allSite: allSite {
      edges {
        node {
          siteMetadata {
            name
            title
            description
            menuLinks {
              title
              slug
            }
            social {
              url
              name
            }
          }
        }
      }
    }
    allArticles: allArticle {
      totalCount
      edges {
        node {
          id
          title
          appDescription
          slug
          hero {
            childImageSharp {
              id
              fluid(
                maxWidth: 653
                quality: 100
                traceSVG: {
                  color: "#fafafa"
                  turnPolicy: TURNPOLICY_MAJORITY
                  blackOnWhite: true
                }
              ) {
                base64
                aspectRatio
                src
                srcSet
                srcWebp
                srcSetWebp
                sizes
                tracedSVG
              }
            }
          }
        }
      }
    }
  }
`;

const NavigationHeader: React.FC<Props> = ({
  navigatorPosition,
  setNavigatorShape,
  navigatorShape,
  theme,
  setMobileControls,
  mobileControlsOpen,
}) => {
  const [showBackArrow, setShowBackArrow] = useState < boolean > false;
  const [previousPath, setPreviousPath] = useState < string > "/";
  const [mobileMenuOpen, setMobileMenuOpen] = useState < boolean > false;

  const { sitePlugin, allSite, allArticles } = useStaticQuery(siteQuery);
  const { title, name, description, social, menuLinks } =
    allSite.edges[0].node.siteMetadata;

  const [colorMode] = useColorMode();
  const fill = colorMode === "dark" ? "#fff" : "#000";
  const fillMore = colorMode === "dark" ? "#E9DAAC" : "#000";
  const isDark = colorMode === "dark";
  const { rootPath, basePath } = sitePlugin.pluginOptions;
  useEffect(() => {
    const { width } = getWindowDimensions();
    const phablet = getBreakpointFromTheme("phablet");

    const prev = localStorage.getItem("previousPath");
    const previousPathWasHomepage =
      prev === (rootPath || basePath) || (prev && prev.includes("/page/"));
    const isNotPaginated = !location.pathname.includes("/page/");

    setShowBackArrow(
      (previousPathWasHomepage && isNotPaginated && width <= phablet) || false
    );
    setPreviousPath(prev || "/");
  }, []);

  const scrollRef = useRef(null);

  const ArticleNavigator = navigatorPosition === "article" ? true : false;

  return (
    <>
      <NavContainer
        theme={theme}
        isDark={isDark}
        mobileMenuOpen={mobileMenuOpen}
        data-pagefind-ignore
      >
        <NavInfoContainer>
          <LogoLink
            fade
            navigatorPosition={ArticleNavigator}
            to={rootPath || basePath}
            data-a11y="false"
            title="Navigate back to the homepage"
            aria-label="Navigate back to the homepage"
            back={showBackArrow ? "true" : "false"}
          >
            {showBackArrow && (
              <BackArrowIconContainer>
                <Icons.ChevronLeft fill={fill} />
              </BackArrowIconContainer>
            )}
            <Logo fill={fill} />
            <Hidden>Navigate back to the homepage</Hidden>
          </LogoLink>
          <Title theme={theme} navigatorPosition={ArticleNavigator}>
            {title}
          </Title>
          <Subtitle theme={theme} navigatorPosition={ArticleNavigator}>
            {name}
          </Subtitle>
          <Description theme={theme}>{description}</Description>
          <StyledBurger
            theme={theme}
            mobileMenuOpen={mobileMenuOpen}
            aria-label="Menu"
            onClick={() => {
              setMobileMenuOpen(!mobileMenuOpen);
              setMobileControls(false);
            }}
          >
            <div />
            <div />
            <div />
          </StyledBurger>
          <StyledMoreButton
            type="button"
            aria-label="More"
            onClick={() => setMobileControls(!mobileControlsOpen)}
          >
            <More fill={fillMore} />
          </StyledMoreButton>
        </NavInfoContainer>
        <NavControls>
          {showBackArrow ? (
            <button
              onClick={() => navigate(previousPath)}
              title="Navigate back to the homepage"
              aria-label="Navigate back to the homepage"
            >
              <Icons.Ex fill={fill} />
            </button>
          ) : null}
          {menuLinks &&
            menuLinks.map((item) =>
              useMemo(
                () => (
                  <NavLink
                    theme={theme}
                    key={item.title}
                    fade
                    to={`/${item.slug}`}
                    navigatorPosition={ArticleNavigator}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {item.title}
                  </NavLink>
                ),
                [item]
              )
            )}
        </NavControls>
        <FadeArticleAnimation
          isDark={isDark}
          navigatorPosition={navigatorPosition}
        >
          <NavSocialContainer>
            <SocialLinks links={social} />
          </NavSocialContainer>
        </FadeArticleAnimation>
        <ArticleViewer
          theme={theme}
          navigatorPosition={navigatorPosition}
          navigatorShape={navigatorShape}
          isDark={isDark}
        >
          <ArticlesControls>
            <ArrowControl
              theme={theme}
              setNavigatorShape={setNavigatorShape}
              navigatorShape={navigatorShape}
            />
          </ArticlesControls>
          <Scrollbar ref={scrollRef} sideMenu={true}>
            <ArticlesHolder>
              {allArticles.edges
                .map((item) =>
                  useMemo(
                    () => (
                      <ArticleLink
                        key={item.node.id}
                        to={item.node.slug}
                        navigatorPosition={ArticleNavigator}
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        <Image fluid={item.node.hero.childImageSharp.fluid} />
                        <ArticleHover theme={theme}>
                          <AppDescription>
                            {item.node.appDescription}
                          </AppDescription>
                          <HoverTitle>{item.node.title}</HoverTitle>
                        </ArticleHover>
                      </ArticleLink>
                    ),
                    [item]
                  )
                )
                .reverse()}
            </ArticlesHolder>
          </Scrollbar>
        </ArticleViewer>
      </NavContainer>
    </>
  );
};

function ArrowControl({ setNavigatorShape, navigatorShape, theme }) {
  const [colorMode] = useColorMode();
  const isDark = colorMode === `dark`;
  const fill = isDark ? "#fff" : "#000";
  let navPosition = "hidden";
  let navText = "Main Menu";
  if (navigatorShape === "hidden") {
    navText = "List of posts";
    navPosition = "visible";
  }

  return (
    <FadeArticleAnimationArrow>
      <Description theme={theme}>{navText}</Description>
      <IconWrapper
        theme={theme}
        navigatorShape={navigatorShape}
        isDark={isDark}
        onClick={() => setNavigatorShape(navPosition)}
        data-a11y="false"
        aria-label="Bring up post menu"
        title="Bring up post menu"
      >
        <Icons.ArrowUp fill={fill} />
      </IconWrapper>
    </FadeArticleAnimationArrow>
  );
}

const mapStateToProps = (state) => {
  return {
    navigatorPosition: state.navigatorPosition,
    navigatorShape: state.navigatorShape,
    navigatorScroll: state.navigatorScroll,
    isWideScreen: state.isWideScreen,
    categoryFilter: state.categoryFilter,
    mobileControlsOpen: state.mobileControlsOpen,
  };
};

const mapDispatchToProps = {
  setNavigatorPosition,
  setNavigatorShape,
  setScrollToTop,
  setFontSizeIncrease,
  setCategoryFilter,
  setMobileControls,
};

export default connect(mapStateToProps, mapDispatchToProps)(NavigationHeader);

const BackArrowIconContainer = styled.div`
  transition: 0.2s transform var(--ease-out-quad);
  opacity: 0;
  padding-right: 30px;
  animation: fadein 0.3s linear forwards;

  @keyframes fadein {
    to {
      opacity: 1;
    }
  }

  ${mediaqueries.desktop_medium`
    display: none;
  `}
`;
