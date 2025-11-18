import { useEffect, useState, memo } from "react";
import {
  MapPin,
  ParkingSquare,
  Zap,
  MessageSquare,
  DoorOpen,
  Bell,
  Car,
  CheckCircle2,
  Navigation,
  Locate,
  Layers,
  Calendar,
  TrendingUp,
  AlertCircle,
  ShieldAlert,
  Cctv,
} from "lucide-react";
import { ServiceCard } from "../components/ServiceCard";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { motion } from "motion/react";
import type { Screen } from "../App";
import { load } from '@2gis/mapgl';
import { Clusterer } from '@2gis/mapgl-clusterer';

interface HomeProps {
  onNavigate: (screen: Screen) => void;
}

export function Home({ onNavigate }: HomeProps) {

  const getMapMarkers = () => {
    return Promise.resolve(
      {
        parkings: [
          {
            id: "p-001",
            coordinates: [69.32029874186605, 41.326250270432894] // исходная
          },
          {
            id: "p-002",
            coordinates: [69.318950, 41.327180]
          },
          {
            id: "p-003",
            coordinates: [69.322410, 41.325670]
          },
          {
            id: "p-004",
            coordinates: [69.319780, 41.328920]
          },
          {
            id: "p-005",
            coordinates: [69.321650, 41.324310]
          }
        ],
        chargings: [
          {
            id: "c-001",
            coordinates: [69.32049874186605, 41.324250270432894] // исходная зарядка
          },
          {
            id: "c-002",
            coordinates: [69.319120, 41.326890]
          },
          {
            id: "c-003",
            coordinates: [69.323050, 41.325110]
          },
          {
            id: "c-004",
            coordinates: [69.320910, 41.327450]
          },
          {
            id: "c-005",
            coordinates: [69.318670, 41.324980]
          }
        ]
      }
    )
  }
  // Временно добавим мок активной парковки для демонстрации
  const [hasActiveParking] = useState(false); // Измените на true чтобы увидеть карточку
  useEffect(() => {
    let map: any = null;

    load().then((mapglAPI) => {
      map = new mapglAPI.Map('map-container', {
        center: [55.31878, 25.23584],
        zoom: 13,
        key: import.meta.env.VITE_GIS_KEY,
      });
      const controlContent = `
                <div class="buttonRoot" id="find-me">
                    <button class="button">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="32"
                            height="32"
                            viewBox="0 0 32 32"
                        >
                            <path
                                fill="currentColor"
                                d="M17.89 26.27l-2.7-9.46-9.46-2.7 18.92-6.76zm-5.62-12.38l4.54 1.3 1.3 4.54 3.24-9.08z"
                            />
                        </svg>
                    </button>
                </div>
                <p id="status"></p>
            `;

      const control = new mapglAPI.Control(map, controlContent, {
        position: 'topLeft',
      });

      const status = control.getContainer().querySelector('#status');
      let circle: any;

      function success(pos) {
        const center = [pos.coords.longitude, pos.coords.latitude];
        if (circle) {
          circle.destroy();
        }
        circle = new mapglAPI.CircleMarker(map, {
          coordinates: center,
          radius: 14,
          color: '#0088ff',
          strokeWidth: 4,
          strokeColor: '#ffffff',
          stroke2Width: 6,
          stroke2Color: '#0088ff55',
        });
        if (status) {
          status.textContent = '';
        }

        map.setCenter(center);
        map.setZoom(16);
      }

      function error() {
        if (status) {
          status.textContent = 'Unable to retrieve your location';
        }
      }

      function geoFindMe() {
        navigator.geolocation.getCurrentPosition(success, error);
      }

      const findMeButton = control.getContainer().querySelector('#find-me');
      if (findMeButton) {
        findMeButton.addEventListener('click', geoFindMe);
      }
      geoFindMe()

      getMapMarkers().then(data => {

        let markers = data.parkings.map(parking => {
          return {
            coordinates: parking.coordinates,
            size: [25, 25],
            icon: '/ce/icons/parking.png',
          }
        })
        data.chargings.map(charging => {
          (new mapglAPI.Marker(map, {
            coordinates: charging.coordinates,
            size: [25, 25],
            icon: '/ce/icons/charging-station.png',
          })).on('click', () => {
            alert(charging.id)
          });
        })
        const clusterer = new Clusterer(map, {
          radius: 80, 
          clusterStyle: {
            icon: '/ce/icons/parking.png',
            size: [25,25],
            hoverIcon: 'https://docs.2gis.com/img/mapgl/clusterHover.svg',
            labelColor: '#ffffff',
            labelFontSize: 16,
          },
        });
        clusterer.load(markers);

      })
    });

    // Удаляем карту при размонтировании компонента
    return () => map && map.destroy();
  }, []);
  const MapWrapper = memo(
    () => {
      return <div id="map-container" style={{ width: '100%', height: '100%' }}></div>;
    },
    () => true,
  );
  const services = [
    {
      id: "parking",
      icon: ParkingSquare,
      title: "Парковки",
      description: "24 парковки рядом",
      color: "bg-blue-500",
      screen: "parking" as Screen,
    },
    {
      id: "charging",
      icon: Zap,
      title: "Зарядные станции",
      description: "8 станций доступны",
      color: "bg-emerald-500",
      screen: "charging" as Screen,
    },
    {
      id: "cases",
      icon: MessageSquare,
      title: "Заявки и обращения",
      description: "2 активные заявки",
      color: "bg-orange-500",
      screen: "cases" as Screen,
    },
    {
      id: "access",
      icon: DoorOpen,
      title: "Домофон",
      description: "Доступ к подъезду",
      color: "bg-purple-500",
      screen: "access" as Screen,
    },
    {
      id: "towing",
      icon: Car,
      title: "Эвакуация и штрафы",
      description: "Проверить автомобиль",
      color: "bg-red-500",
      screen: "cases" as Screen,
    },
    {
      id: "barrier",
      icon: ShieldAlert,
      title: "Шлагбаум",
      description: "Открыть шлагбаум",
      color: "bg-teal-500",
      screen: "barrier" as Screen,
    },
    {
      id: "cams",
      icon: Cctv,
      title: "Камеры",
      description: "Просмотр камер",
      color: "bg-gray-500",
      screen: "cams" as Screen,
    },
  ];

  const quickStats: { icon: any, count: number, label: string, color: string, nav: Screen }[] = [
    {
      icon: ParkingSquare,
      count: 24,
      label: "Парковок",
      color: "bg-blue-500",
      nav: "parking",
    },
    {
      icon: Zap,
      count: 8,
      label: "Зарядок",
      color: "bg-emerald-500",
      nav: "charging",
    },
    {
      icon: MessageSquare,
      count: 2,
      label: "Заявки",
      color: "bg-orange-500",
      nav: "cases",
    },
    {
      icon: Cctv,
      count: 4,
      label: "Камеры",
      color: "bg-slate-500",
      nav: "cams",
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Modern Header */}
      <div className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 px-4 pt-10 pb-4">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-slate-50 mb-0.5">SmartCity</h1>
            <div className="flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-emerald-400" />
              <p className="text-slate-300 text-sm">
                Яккасарайский район
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button className="w-9 h-9 rounded-xl bg-slate-800/60 hover:bg-slate-700/60 flex items-center justify-center transition-colors border border-slate-700/50">
              <Calendar className="w-4.5 h-4.5 text-slate-300" />
            </button>
            <button
              onClick={() => onNavigate("notifications")}
              className="relative w-9 h-9 rounded-xl bg-slate-800/60 hover:bg-slate-700/60 flex items-center justify-center transition-colors border border-slate-700/50"
            >
              <Bell className="w-4.5 h-4.5 text-slate-300" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-[#3BB273] rounded-full border border-slate-900"></span>
            </button>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 gap-2">
          {quickStats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={index}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: index * 0.1 }}
                onClick={() => onNavigate(stat.nav)}
                className="bg-slate-800/40 backdrop-blur-sm rounded-xl p-2.5 border border-slate-700/30"
              >
                <div
                  className={`w-7 h-7 rounded-lg ${stat.color} flex items-center justify-center mb-1.5`}
                >
                  <Icon className="w-4 h-4 text-slate-50 stroke-[2.5]" />
                </div>
                <p className="text-slate-50">{stat.count}</p>
                <p className="text-slate-400 text-xs">
                  {stat.label}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Interactive Map View */}
      <div className="relative h-72 bg-slate-900 -mt-2 overflow-hidden">
        {/* Map image */}

        {/* <div className="absolute inset-0">
          <ImageWithFallback
            src="https://images.unsplash.com/photo-1759802524049-2421ddaee0fe?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaXR5JTIwbWFwJTIwc3RyZWV0fGVufDF8fHx8MTc2Mjg2NTc3MHww&ixlib=rb-4.1.0&q=80&w=1080"
            alt="Map"
            className="w-full h-full object-cover opacity-70"
          /> */}
        {/* Dark overlay for better contrast */}
        {/* <div className="absolute inset-0 bg-gradient-to-b from-slate-900/40 via-transparent to-slate-900/60" /> */}
        {/* </div> */}
        <MapWrapper />
        {/* Map Controls */}
        {/* <div className="absolute top-3 right-3 flex flex-col gap-2">
          <button className="w-9 h-9 rounded-xl bg-slate-50 shadow-lg hover:shadow-xl flex items-center justify-center transition-all">
            <Locate className="w-4.5 h-4.5 text-slate-700 stroke-[2.5]" />
          </button>
          <button className="w-9 h-9 rounded-xl bg-slate-50 shadow-lg hover:shadow-xl flex items-center justify-center transition-all">
            <Layers className="w-4.5 h-4.5 text-slate-700 stroke-[2.5]" />
          </button>
        </div> */}

        {/* Active Parking on Map */}
        {hasActiveParking && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="absolute top-28 left-1/2 -translate-x-1/2"
          >
            <div className="relative">
              <div className="absolute inset-0 bg-[#3BB273] rounded-full blur-xl opacity-60 animate-pulse" />
              <div className="relative w-14 h-14 rounded-full bg-[#3BB273] shadow-2xl flex items-center justify-center border-3 border-slate-50">
                <CheckCircle2 className="w-7 h-7 text-slate-50 stroke-[2.5]" />
              </div>
            </div>
          </motion.div>
        )}
      </div>

      {/* Services */}
      <div className="px-4 py-5">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-slate-900">Городские услуги</h2>
          <button className="text-[#3BB273] text-sm hover:text-[#2ea563] flex items-center gap-1">
            Все
            <TrendingUp className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Active Parking Quick Access */}
        {hasActiveParking && (
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            onClick={() => onNavigate("parking")}
            className="bg-gradient-to-br from-[#3BB273] to-emerald-600 rounded-2xl p-4 mb-3 cursor-pointer shadow-lg"
          >
            <div className="flex items-center gap-3 mb-2.5">
              <div className="w-9 h-9 rounded-xl bg-slate-50/20 backdrop-blur-sm flex items-center justify-center border border-slate-50/30">
                <CheckCircle2 className="w-5 h-5 text-slate-50 stroke-[2.5]" />
              </div>
              <div className="flex-1">
                <p className="text-emerald-100 text-xs">
                  Активная парковка
                </p>
                <h3 className="text-slate-50">
                  Amir Temur Square
                </h3>
              </div>
              <Navigation className="w-4.5 h-4.5 text-slate-50 stroke-[2.5]" />
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-emerald-100">
                Оплачено до 16:30
              </span>
              <span className="text-slate-50">
                На парковке 1ч 23м
              </span>
            </div>
          </motion.div>
        )}

        <div className="grid grid-cols-2 gap-2.5">
          {services.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: index * 0.05 }}
            >
              <ServiceCard
                {...service}
                onClick={() => onNavigate(service.screen)}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}