import { useState, memo, useEffect } from "react";
import {
  ArrowLeft,
  MapPin,
  CreditCard,
  Navigation,
  Star,
  CheckCircle2,
  X,
} from "lucide-react";
import { Button } from "../components/ui/button";
import { motion } from "motion/react";
import { load } from '@2gis/mapgl';
import { calculateDistance, ParkingService } from "../services";
import { ParkingZone, ParkingSession } from "../types/parking";

interface ParkingProps {
  onBack: () => void;
}

export function Parking({ onBack }: ParkingProps) {
  const [selectedZone, setSelectedZone] = useState<ParkingZone | null>(null);
  const [showPayment, setShowPayment] = useState(false);
  const [activeSession, setActiveSession] = useState<ParkingSession | null>(null);
  const [parkings, setParkings] = useState<ParkingZone[]>([]);
  const [currentLocation, setCurrentLocation] = useState<GeolocationPosition | null>(null);
  const [vehicleNumber, setVehicleNumber] = useState("01A234BC");

  const handlePayment = async () => {
    if (!selectedZone) return;

    try {
      const session = await ParkingService.startSession(selectedZone.id, vehicleNumber);
      setActiveSession(session);
      setShowPayment(false);
      setSelectedZone(null);
    } catch (error) {
      console.error('Ошибка при запуске сессии:', error);
    }
  };

  const handleEndParking = async () => {
    if (!activeSession) return;

    try {
      await ParkingService.endSession(activeSession.id);
      setActiveSession(null);
    } catch (error) {
      console.error('Ошибка при завершении сессии:', error);
    }
  };

  const getElapsedTime = () => {
    if (!activeSession) return "";
    const elapsed = Math.floor(
      (new Date().getTime() - new Date(activeSession.startTime).getTime()) / 1000 / 60
    );
    const hours = Math.floor(elapsed / 60);
    const minutes = elapsed % 60;
    return `${hours}ч ${minutes}м`;
  };

  useEffect(() => {
    ParkingService.getActiveSession()
      .then(session => {
        if (session) setActiveSession(session);
      })
      .catch(console.error);
  }, []);

  if (showPayment && selectedZone) {
    const prepaidHours = 2;
    const totalCost = selectedZone.pricePerHour * prepaidHours;

    return (
      <div className="min-h-screen bg-slate-50">
        <div className="bg-white border-b border-slate-200 px-4 py-12">
          <button
            onClick={() => setShowPayment(false)}
            className="mb-4"
          >
            <ArrowLeft className="w-6 h-6 text-slate-900" />
          </button>
          <h1 className="text-slate-900">Оплата парковки</h1>
        </div>

        <div className="p-4 space-y-4">
          <div className="bg-white rounded-3xl p-6 shadow-sm">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-2xl bg-blue-500 flex items-center justify-center">
                <MapPin className="w-6 h-6 text-white" />
              </div>
              <div className="flex-1">
                <h3 className="text-slate-900">
                  {selectedZone.name}
                </h3>
                <p className="text-slate-600 text-sm">
                  {selectedZone.address}
                </p>
              </div>
            </div>

            <div className="space-y-3 mb-6">
              <div className="flex justify-between py-2 border-b border-slate-100">
                <span className="text-slate-600">Тариф</span>
                <span className="text-slate-900">
                  {selectedZone.pricePerHour} {selectedZone.currency}/час
                </span>
              </div>
              <div className="flex justify-between py-2 border-b border-slate-100">
                <span className="text-slate-600">Номер машины</span>
                <input
                  type="text"
                  value={vehicleNumber}
                  onChange={(e) => setVehicleNumber(e.target.value)}
                  className="text-slate-900 text-right bg-transparent outline-none"
                />
              </div>
              <div className="flex justify-between py-2 border-b border-slate-100">
                <span className="text-slate-600">Предоплата</span>
                <span className="text-slate-900">{prepaidHours} часа</span>
              </div>
              <div className="flex justify-between py-2">
                <span className="text-slate-900">Итого</span>
                <span className="text-slate-900">
                  {totalCost.toLocaleString()} {selectedZone.currency}
                </span>
              </div>
            </div>

            <Button
              className="w-full h-14 bg-[#3BB273] hover:bg-[#2ea563] rounded-2xl"
              onClick={handlePayment}
            >
              Оплатить {totalCost.toLocaleString()} {selectedZone.currency}
            </Button>
          </div>

          <div className="bg-white rounded-3xl p-6 shadow-sm">
            <h3 className="text-slate-900 mb-4">
              Способ оплаты
            </h3>
            <div className="flex items-center gap-3 p-4 rounded-2xl bg-slate-50">
              <CreditCard className="w-6 h-6 text-slate-600" />
              <div className="flex-1">
                <p className="text-slate-900">•••• 4321</p>
                <p className="text-slate-600 text-sm">Uzcard</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (activeSession && activeSession.zone) {
    return (
      <div className="min-h-screen bg-slate-50">
        <div className="bg-white border-b border-slate-200 px-4 py-12">
          <button onClick={onBack} className="mb-4">
            <ArrowLeft className="w-6 h-6 text-slate-900" />
          </button>
          <h1 className="text-slate-900">Активная парковка</h1>
        </div>

        <div className="p-4 space-y-4">
          <div className="bg-white rounded-3xl p-6 shadow-sm">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-2xl bg-blue-500 flex items-center justify-center">
                <MapPin className="w-6 h-6 text-white" />
              </div>
              <div className="flex-1">
                <h3 className="text-slate-900">
                  {activeSession.zone.name}
                </h3>
                <p className="text-slate-600 text-sm">
                  {activeSession.zone.address}
                </p>
              </div>
            </div>

            <div className="space-y-3 mb-6">
              <div className="flex justify-between py-2 border-b border-slate-100">
                <span className="text-slate-600">Номер машины</span>
                <span className="text-slate-900">
                  {activeSession.vehicleNumber}
                </span>
              </div>
              <div className="flex justify-between py-2 border-b border-slate-100">
                <span className="text-slate-600">Тариф</span>
                <span className="text-slate-900">
                  {activeSession.pricePerHour || activeSession.zone.hourlyRate} {activeSession.currency}/час
                </span>
              </div>
              <div className="flex justify-between py-2 border-b border-slate-100">
                <span className="text-slate-600">
                  Время начала
                </span>
                <span className="text-slate-900">
                  {new Date(activeSession.startTime).toLocaleTimeString()}
                </span>
              </div>
              <div className="flex justify-between py-2">
                <span className="text-slate-900">
                  Прошло времени
                </span>
                <span className="text-slate-900">
                  {getElapsedTime()}
                </span>
              </div>
              <div className="flex justify-between py-2">
                <span className="text-slate-900">Итого</span>
                <span className="text-slate-900">
                  {activeSession.totalCost.toLocaleString()} {activeSession.currency}
                </span>
              </div>
            </div>

            <Button
              className="w-full h-14 bg-[#3BB273] hover:bg-[#2ea563] rounded-2xl"
              onClick={handleEndParking}
            >
              Завершить парковку
            </Button>
          </div>
        </div>
      </div>
    );
  }

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
        ParkingService.getNearbyZones({
          latitude: pos.coords.latitude,
          longitude: pos.coords.longitude,
          radius: 5
        })
          .then(data => {
            setParkings(data)
            data.map(parking => {
              (new mapglAPI.Marker(map, {
                coordinates: [parking.longitude, parking.latitude],
                size: [25, 25],
                icon: '/ce/icons/parking.png',
              })).on('click', () => {
                alert(parking.id)
              });
            })
          })
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
        navigator.geolocation.getCurrentPosition((pos: GeolocationPosition) => {
          setCurrentLocation(pos) 
          success(pos)
        }, error);
      }

      const findMeButton = control.getContainer().querySelector('#find-me');
      if (findMeButton) {
        findMeButton.addEventListener('click', geoFindMe);
      }
      geoFindMe()
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
  return (
    <div className="min-h-screen bg-slate-50">
      <div className="bg-white border-b border-slate-200 px-4 py-12">
        <button onClick={onBack} className="mb-4">
          <ArrowLeft className="w-6 h-6 text-slate-900" />
        </button>
        <h1 className="text-slate-900 mb-1">Парковки рядом</h1>
        <p className="text-slate-600">
          Найдено {parkings?.length} парковок
        </p>
      </div>

      {/* Map preview */}
      <div className="relative h-48 bg-slate-200 border-b border-slate-300">
        <div className="absolute inset-0 flex items-center justify-center">
          <MapWrapper />
        </div>
      </div>

      <div className="p-4 space-y-3">
        {/* Active Parking Card */}
        {activeSession && activeSession.zone && (
          <div className="bg-gradient-to-br from-[#3BB273] to-emerald-600 rounded-3xl p-6 shadow-lg mb-4">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-6 h-6 text-white" />
                <h3 className="text-white">
                  Активная парковка
                </h3>
              </div>
              <button
                onClick={handleEndParking}
                className="w-8 h-8 rounded-lg bg-white/20 hover:bg-white/30 flex items-center justify-center transition-colors"
              >
                <X className="w-5 h-5 text-white" />
              </button>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 mb-4 border border-white/20">
              <h4 className="text-white mb-1">
                {activeSession.zone.name}
              </h4>
              <p className="text-emerald-100 text-sm mb-3">
                {activeSession.zone.address}
              </p>

              <div className="grid grid-cols-2 gap-3 mb-3">
                <div>
                  <p className="text-emerald-100 text-xs mb-1">
                    Время на парковке
                  </p>
                  <p className="text-white">
                    {getElapsedTime()}
                  </p>
                </div>
                <div>
                  <p className="text-emerald-100 text-xs mb-1">
                    Номер машины
                  </p>
                  <p className="text-white">
                    {activeSession.vehicleNumber}
                  </p>
                </div>
              </div>

              <div className="pt-3 border-t border-white/20">
                <p className="text-emerald-100 text-xs mb-1">
                  Стоимость
                </p>
                <p className="text-white">
                  {activeSession.totalCost.toLocaleString()} {activeSession.currency}
                </p>
              </div>
            </div>

            <div className="flex gap-2">
              <Button
                onClick={handleEndParking}
                className="flex-1 h-12 bg-white hover:bg-emerald-50 text-[#3BB273] rounded-2xl"
              >
                Завершить
              </Button>
            </div>
          </div>
        )}

        {parkings?.map((parking) => (
          <motion.div
            key={parking.id}
            whileTap={{ scale: 0.98 }}
            onClick={() => setSelectedZone(parking)}
            className={`bg-white rounded-3xl p-5 shadow-sm cursor-pointer transition-all ${selectedZone?.id === parking.id
              ? "ring-2 ring-[#3BB273]"
              : ""
              }`}
          >
            <div className="flex items-start justify-between mb-3">
              <div className="flex-1">
                <h3 className="text-slate-900 mb-1">
                  {parking.name}
                </h3>
                <div className="flex items-center gap-4 text-sm">
                  <span className="text-slate-600 flex items-center gap-1">
                    <MapPin className="w-4 h-4" />
                    {currentLocation?.coords && calculateDistance(currentLocation.coords.latitude, currentLocation.coords.longitude, parking.latitude, parking.longitude).toFixed(1)} км
                  </span>
                  <span className="text-slate-600 flex items-center gap-1">
                    <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                    4.8
                  </span>
                </div>
              </div>
              <button className="w-10 h-10 rounded-xl bg-slate-100 hover:bg-slate-200 flex items-center justify-center">
                <Navigation className="w-5 h-5 text-slate-700" />
              </button>
            </div>

            <p className="text-slate-600 text-sm mb-3">
              {parking.address}
            </p>

            <div className="flex items-center justify-between pt-3 border-t border-slate-100">
              <div>
                <p className="text-slate-600 text-sm">
                  Свободно мест
                </p>
                <p className="text-slate-900">
                  {parking.availableSpots} из {parking.capacity}
                </p>
              </div>
              <div className="text-right">
                <p className="text-slate-600 text-sm">Тариф</p>
                <p className="text-slate-900">{parking.pricePerHour} {parking.currency}/ч</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {selectedZone && (
        <div className="fixed bottom-20 left-0 right-0 p-4 bg-gradient-to-t from-white via-white to-transparent">
          <Button
            onClick={() => setShowPayment(true)}
            className="w-full h-14 bg-[#3BB273] hover:bg-[#2ea563] rounded-2xl shadow-lg"
          >
            Забронировать место
          </Button>
        </div>
      )}
    </div>
  );
}