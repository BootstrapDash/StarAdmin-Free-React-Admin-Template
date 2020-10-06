import styled from 'styled-components'

export const PopoverTrigger = styled.a`
`;

export const PopoverContent = styled.div`
  box-sizing: border-box;
  position: absolute;
  z-index: 10;
  box-shadow: 2px 2px 8px rgba(0, 0, 0, 0.3);
  transition: all 0.3s ease 0ms;
  border-radius: 3px;
  min-width: 7em;
  flex-flow: column nowrap;
  background-color: #000;
  color: #fff;
  padding: 5px;
  visibility: hidden;
  opacity: 0;

  ${props => props.active && `
    visibility: visible;
    opacity: 1;
    transition-delay: 100ms;
  `}

  &::before {
    content: "";
    position: absolute;
    background: transparent none repeat scroll 0 0;
    border: 6px solid transparent;
    transition: all 0.3s ease 0ms;
  }
`;
export const PopoverContainer = styled.div`
  position: relative;
  display: inline-flex;
  box-sizing: border-box;

  ${props => props.position === 'top' && `
    flex-flow: column-reverse nowrap;
    ${PopoverContent} {
      bottom: 0;
      left: 50%;
      transform: translateX(-50%) translateY(-50%) translateY(-6px);

      &::before {
        border-top-color: #000;
        bottom: -4px;
        transform: translateX(-50%) translateY(8px);
        left: 50%;
    }
  `}
  ${props => props.position === 'bottom' && `
    flex-flow: column nowrap;
    ${PopoverContent} {
      left: 50%;
      transform: translateX(-50%) translateY(6px);

      &::before {
        border-bottom-color: #000;
        top: -20px;
        transform: translateX(-50%) translateY(8px);
        left: 50%;
      }
    }
  `}
  ${props => props.position === 'left' && `
    flex-flow: row-reverse nowrap;
    ${PopoverContent} {
      top: 50%;
      transform: translateY(-50%) translateX(-100%);

      &::before {
        border-left-color: #000;
        right: -6px;
        transform: translateX(50%) translateY(-6px);
        top: 50%;
      }
    }
  `}
  ${props => props.position === 'right' && `
    flex-flow: row nowrap;
    ${PopoverContent} {
      top: 50%;
      transform: translateY(-50%) translateX(6px);

      &::before {
        border-right-color: #000;
        left: -6px;
        transform: translateX(-50%) translateY(-6px);
        top: 50%;
      }
    }
  `}
`;
