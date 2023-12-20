import React, { useEffect, useReducer, useRef } from 'react';
import { cn } from '@/lib/utils';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from '@/components/ui';

interface ToothProps {
  number: number;
  positionX: number;
  positionY: number;
  onChange: (id: number, toothState: any) => void;
}

export const Tooth = ({
  number,
  positionX,
  positionY,
  onChange,
}: Readonly<ToothProps>) => {
  const initialState = {
    tooth: number,
    cavities: {
      center: 0,
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
    },
    extract: 0,
    absent: 0,
    crown: 0,
    endodontics: 0,
    filter: 0,
    unerupted: 0,
    implant: 0,
    regeneration: 0,
  };

  function reducer(toothState: any, action: any) {
    switch (action.type) {
      case 'crown':
        return { ...toothState, crown: action.value };
      case 'extract':
        return { ...toothState, extract: action.value };
      case 'absent':
        return { ...toothState, absent: action.value };
      case 'filter':
        return { ...toothState, filter: action.value };
      case 'unerupted':
        return { ...toothState, unerupted: action.value };
      case 'implant':
        return { ...toothState, implant: action.value };
      case 'regeneration':
        return { ...toothState, regeneration: action.value };
      case 'endodontics':
        return { ...toothState, endodontics: action.value };
      case 'carie':
        return {
          ...toothState,
          cavities: setCavities(toothState, action.zone, action.value),
        };
      case 'clear':
        return initialState;
      default:
        throw new Error();
    }
  }

  const crown = (val: number) => ({ type: 'crown', value: val });
  const endodontics = (val: number) => ({ type: 'endodontics', value: val });
  const extract = (val: number) => ({ type: 'extract', value: val });
  const absent = (val: number) => ({ type: 'absent', value: val });
  const unerupted = (val: number) => ({ type: 'unerupted', value: val });
  const implant = (val: number) => ({ type: 'implant', value: val });
  const regeneration = (val: number) => ({ type: 'regeneration', value: val });
  const carie = (z: string, val: number) => ({ type: 'carie', value: val, zone: z });
  const clear = () => ({ type: 'clear' });

  const [toothState, dispatch] = useReducer(reducer, initialState);

  const firstUpdate = useRef(true);

  const menuContent = [
    {
      name: 'Caries',
      onClick: (zone: string) => dispatch(carie(zone, 2)),
    },
    {
      name: 'Obturación',
      onClick: (zone: string) => dispatch(carie(zone, 1)),
    },
    {
      name: 'Caries en todos',
      onClick: () => dispatch(carie('all', 2)),
    },
    {
      name: 'Obturación en todos',
      onClick: () => dispatch(carie('all', 1)),
    },
    {
      name: 'Ausente',
      onClick: () => {
        dispatch(clear());
        dispatch(absent(1));
      },
    },
    {
      name: 'Extracción',
      onClick: () => {
        dispatch(clear());
        dispatch(extract(2));
      },
    },
    {
      name: 'Sin erupcionar',
      onClick: () => dispatch(unerupted(1)),
    },
    {
      name: 'DX',
      subMenu: [
        {
          name: 'Corona DX',
          onClick: () => dispatch(crown(1)),
        },
        {
          name: 'Endodoncia DX',
          onClick: () => dispatch(endodontics(1)),
        },
        {
          name: 'Implante DX',
          onClick: () => dispatch(implant(1)),
        },
        {
          name: 'Regeneración DX',
          onClick: () => dispatch(regeneration(1)),
        },
      ],
    },
    {
      name: 'TTO',
      subMenu: [
        {
          name: 'Corona TTO',
          onClick: () => dispatch(crown(2)),
        },
        {
          name: 'Endodoncia TTO',
          onClick: () => dispatch(endodontics(2)),
        },
        {
          name: 'Implante TTO',
          onClick: () => dispatch(implant(2)),
        },
        {
          name: 'Regeneración TTO',
          onClick: () => dispatch(regeneration(2)),
        },
      ],
    },
  ];

  let getClassNamesByZone = (zone: string) => {
    if (toothState.cavities) {
      if (toothState.cavities[zone] === 2) {
        return 'fill-[#ff0000]';
      } else if (toothState.cavities[zone] === 1) {
        return 'fill-[#0000ff]';
      }
    }

    return '';
  };

  const polygons = [
    {
      points: '0,0 20,0 15,5 5,5',
      zone: 'top',
    },
    {
      points: '5,15 15,15 20,20 0,20',
      zone: 'bottom',
    },
    {
      points: '15,5 20,0 20,20 15,15',
      zone: 'left',
    },
    {
      points: '0,0 5,5 5,15 0,20',
      zone: 'right',
    },
    {
      points: '5,5 15,5 15,15 5,15',
      zone: 'center',
    },
  ];

  useEffect(() => {
    if (firstUpdate.current) {
      firstUpdate.current = false;
      return;
    }
    onChange(number, toothState);
  }, [toothState, onChange, number]);

  return (
    <svg className={cn('cursor-pointer fill-white')}>
      <g transform={`translate(${positionX},${positionY})`}>
        {polygons.map((polygon) => (
          <DropdownMenu key={polygon.zone}>
            <DropdownMenuTrigger asChild>
              <polygon
                key={polygon.zone}
                points={polygon.points}
                className={cn(
                  'stroke-black stroke-[0.5px] hover:fill-gray-400',
                  getClassNamesByZone(polygon.zone)
                )}
              />
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
              <DropdownMenuGroup>
                {menuContent.map((item) => (
                  <React.Fragment key={item.name}>
                    {item.subMenu ? (
                      <DropdownMenuSub>
                        <DropdownMenuSubTrigger>{item.name}</DropdownMenuSubTrigger>
                        <DropdownMenuPortal>
                          <DropdownMenuSubContent>
                            {item.subMenu.map((subItem) => (
                              <DropdownMenuItem
                                key={subItem.name}
                                onClick={() => subItem.onClick()}
                              >
                                {subItem.name}
                              </DropdownMenuItem>
                            ))}
                          </DropdownMenuSubContent>
                        </DropdownMenuPortal>
                      </DropdownMenuSub>
                    ) : (
                      <DropdownMenuItem onClick={() => item.onClick(polygon.zone)}>
                        {item.name}
                      </DropdownMenuItem>
                    )}
                  </React.Fragment>
                ))}
              </DropdownMenuGroup>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => dispatch(clear())}>
                Limpiar todo
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ))}

        {drawToothActions()}
        <text
          x="6"
          y="30"
          stroke="navy"
          fill="navy"
          strokeWidth="0.1"
          className="fill-primary text-[8px] text-center w-full"
        >
          {number}
        </text>
      </g>
    </svg>
  );

  function setCavities(
    prevState: {
      cavities: {
        center: number;
        top: number;
        bottom: number;
        left: number;
        right: number;
      };
    },
    zone: string,
    value: number
  ) {
    if (prevState?.cavities) {
      if (zone === 'all') {
        prevState.cavities = {
          center: value,
          top: value,
          bottom: value,
          left: value,
          right: value,
        };
      } else {
        (prevState.cavities as any)[zone] = value;
      }

      return prevState.cavities;
    }
  }

  function drawToothActions() {
    let otherFigures = null;

    if (toothState.extract > 0) {
      otherFigures = (
        <g stroke={toothState.extract === 2 ? 'red' : 'blue'}>
          <line x1="0" y1="0" x2="20" y2="20" strokeWidth="2" />
          <line x1="0" y1="20" x2="20" y2="0" strokeWidth="2" />
        </g>
      );
    }

    if (toothState.endodontics > 0) {
      otherFigures = (
        <g stroke={toothState.endodontics === 2 ? 'red' : 'blue'}>
          <line x1="10" y1="0" x2="20" y2="20" strokeWidth="2" />
          <line x1="0" y1="20" x2="10" y2="0" strokeWidth="2" />
          <line x1="0" y1="19.38" x2="20" y2="19.38" strokeWidth="2" />
        </g>
      );
    }

    if (toothState.absent > 0) {
      otherFigures = (
        <g stroke={toothState.absent === 2 ? 'red' : 'blue'}>
          <line x1="10" y1="0" x2="10" y2="20" strokeWidth="2" />
        </g>
      );
    }

    if (toothState.unerupted > 0) {
      otherFigures = (
        <g stroke={toothState.unerupted === 2 ? 'red' : 'blue'}>
          <line x1="0" y1="10" x2="20" y2="10" strokeWidth="2"></line>
        </g>
      );
    }

    if (toothState.implant > 0) {
      otherFigures = (
        <g stroke={toothState.implant === 2 ? 'red' : 'blue'}>
          <circle cx="10" cy="10" r="8" fill="none" strokeWidth="2" />
          <line x1="4" y1="10" x2="16" y2="10" strokeWidth="2" />
          <line x1="10" y1="4" x2="10" y2="16" strokeWidth="2" />
        </g>
      );
    }

    if (toothState.regeneration > 0) {
      otherFigures = (
        <g stroke={toothState.regeneration === 2 ? 'red' : 'blue'}>
          <path
            d="M 0 10 Q 5 0 10 10 T 20 10"
            fill="none"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </g>
      );
    }

    if (toothState.filter > 0) {
      otherFigures = (
        <g stroke={toothState.filter === 2 ? 'red' : 'blue'}>
          <line x1="0" y1="20" x2="20" y2="0" strokeWidth="2" />
        </g>
      );
    }

    if (toothState.crown > 0) {
      otherFigures = (
        <g stroke={toothState.crown === 2 ? 'red' : 'blue'}>
          <circle cx="10" cy="10" r="10" fill="none" strokeWidth="2" />
          {toothState.endodontics > 0 && (
            <>
              <line x1="10" y1="0" x2="20" y2="20" strokeWidth="2" />
              <line x1="0" y1="20" x2="10" y2="0" strokeWidth="2" />
              <line x1="0" y1="19.38" x2="20" y2="19.38" strokeWidth="2" />
            </>
          )}
        </g>
      );
    }

    return otherFigures;
  }
};
