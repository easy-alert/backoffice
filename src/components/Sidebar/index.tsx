// LIBS
import React, { useEffect, useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';

// COMPONENTS
import { theme } from '../../styles/theme';
import * as Style from './styles';

// ICONS
import { icon } from '../../assets/icons/index';

// COMPONENTS
import { Image } from '../Image';
import { IconButton } from '../Buttons/IconButton';

// TYPES
import { SidebarContentProps } from './utils/types';
import { useAuthContext } from '../../contexts/Auth/UseAuthContext';

export const Sidebar = () => {
  const { signout } = useAuthContext();
  const navigate = useNavigate();

  const [openSidebar, setOpenSidebar] = useState<boolean>(false);
  const [animate, setAnimate] = useState<boolean>(true);

  const SidebarContent: SidebarContentProps[] = [
    {
      icon: icon.dashboard,
      url: '/dashboard',
      redirectFunction: () => {
        navigate('/dashboard');
      },
      label: 'Dashboard',
    },
    {
      icon: icon.enterprise,
      url: '/companies',
      redirectFunction: () => {
        navigate('/companies');
      },
      label: 'Empresas',
    },
    {
      icon: icon.users,
      url: '/users',
      redirectFunction: () => {
        navigate('/users');
      },
      label: 'Usuários',
    },
    {
      icon: icon.building,
      url: '/buildings',
      redirectFunction: () => {
        navigate('/buildings');
      },
      label: 'Edificações',
    },
    {
      icon: icon.maintenances,
      url: '/maintenances',
      redirectFunction: () => {
        navigate('/maintenances');
      },
      label: 'Manutenções',
    },
    {
      icon: icon.verified,
      url: '/guarantees',
      redirectFunction: () => {
        navigate('/guarantees');
      },
      label: 'Garantias',
    },
    {
      icon: icon.tutorial,
      url: '/videos',
      redirectFunction: () => {
        navigate('/videos');
      },
      label: 'Vídeos',
    },
    {
      icon: icon.enterprise,
      url: '/feed',
      redirectFunction: () => {
        navigate('/feed');
      },
      label: 'Notícias',
    },
    {
      icon: icon.chatbot,
      url: '/chatbot',
      redirectFunction: () => {
        navigate('/chatbot');
      },
      label: 'Chatbot',
    },

    // Desativado em função das tasks SA-6535 em diante que mudou isso pra company
    // {
    //   icon: icon.suppliers,
    //   url: '/suppliers',
    //   redirectFunction: () => {
    //     navigate('/suppliers');
    //   },
    // },
    {
      icon: icon.power,
      url: '/login',
      redirectFunction: () => {
        signout();
        navigate('/login');
      },
    },
  ];

  useEffect(() => {
    if (window.location.href.endsWith('/')) {
      navigate('/companies');
    }
  }, []);

  return (
    <Style.Background>
      <Style.SidebarBodyMobile>
        <IconButton
          labelPos="bottom"
          icon={icon.list}
          onClick={() => {
            setAnimate(true);
            setOpenSidebar(true);
          }}
        />
        <Style.ImageMobile>
          <Image width="44px" height="48px" radius="0px" img={icon.logoWhite} />
        </Style.ImageMobile>
      </Style.SidebarBodyMobile>

      <Style.SidebarBody openSidebar={openSidebar}>
        <Style.CloseButtonMobile>
          <IconButton
            labelPos="bottom"
            icon={icon.xWhite}
            onClick={() => {
              setAnimate(false);
              setTimeout(() => {
                setOpenSidebar(false);
              }, 125);
            }}
          />
        </Style.CloseButtonMobile>

        <Style.ImageContainer>
          <Image width="44px" height="48px" radius="0px" img={icon.logoWhite} />
        </Style.ImageContainer>

        <Style.Hr />

        {SidebarContent.map((element, i: number) => (
          <React.Fragment key={element.url}>
            {i === SidebarContent.length - 1 && <Style.Spacer />}
            <IconButton
              fontWeight="400"
              className="p5"
              label={element.label}
              labelPos="bottom"
              opacity="0.5"
              icon={element.icon}
              color={theme.color.white}
              gap="0px"
              onClick={() => {
                const checkKeyPress = window.event as KeyboardEvent;
                if (checkKeyPress?.ctrlKey) {
                  window.open(element.url, '_blank');
                } else if (openSidebar) {
                  setAnimate(false);
                  setTimeout(() => {
                    setOpenSidebar(false);
                    element.redirectFunction();
                  }, 125);
                } else {
                  element.redirectFunction();
                }
              }}
              onAuxClick={() => {
                if (openSidebar) {
                  setAnimate(false);
                  setTimeout(() => {
                    setOpenSidebar(false);
                    window.open(element.url, '_blank');
                  }, 125);
                } else {
                  window.open(element.url, '_blank');
                }
              }}
              selected={window.location.pathname.startsWith(element.url)}
            />
          </React.Fragment>
        ))}
      </Style.SidebarBody>

      {openSidebar && (
        <Style.MobileBackground
          animate={animate}
          onClick={() => {
            setAnimate(false);
            setTimeout(() => {
              setOpenSidebar(false);
            }, 125);
          }}
        />
      )}

      <Style.AppContent>
        <Outlet />
      </Style.AppContent>
    </Style.Background>
  );
};
