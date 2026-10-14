---
title: "Integraciones de combustible"
url: https://fleetbase.io/docs/fleet-ops/recipes/fuel-provider-integrations
module: fleet-ops
---

Recetas

# Integraciones de combustible

Registre integraciones personalizadas de tarjetas de combustible y gestión de combustible en Fleet-Ops sin modificar el núcleo de Fleet-Ops.

# Integraciones de combustible

Las integraciones de combustible de Fleet-Ops conectan proveedores externos de tarjetas de combustible, redes de estaciones, sistemas de gestión de combustible en el sitio y APIs de facturación con Fleet-Ops. PetroApp se ofrece como la integración nativa de ejemplo, y las extensiones pueden registrar proveedores adicionales a través del mismo marco.

Las integraciones de combustible se dividen en tres registros:

| Registro | Propósito |
|---|---|
| `FuelProviderConnection` | La cuenta de integración configurada, las credenciales, la configuración de sincronización, el alcance de la empresa y el estado de salud |
| `FuelProviderTransaction` | El registro de facturas o transacciones del proveedor importado, el estado de coincidencia, el payload original, el payload normalizado y la fuente de auditoría |
| `FuelReport` | Los eventos de combustible de Fleet-Ops que los usuarios operativos revisan, informan y utilizan en flujos de trabajo después de que una transacción se haya coincidido con un vehículo |

Las transacciones del proveedor son el registro de importación. Los informes de combustible son los registros operativos. Las transacciones del proveedor importadas aparecen en
**Fleet-Ops → Gestión → Transacciones de combustible**
. Las transacciones coincidentes pueden crear o actualizar informes de
**Fuel Reports**
, mientras que las transacciones no coincidentes siguen disponibles para su revisión.

## Cómo las extensiones registran proveedores

Una extensión registra un descriptor de proveedor a partir del proveedor de servicios de Laravel. El descriptor le indica a Fleet-Ops cómo mostrar el proveedor, qué credenciales recopilar y qué clase de adaptador maneja las llamadas a la API.

```
namespace Vendor\FuelProvider\Providers;

use Fleetbase\FleetOps\Support\FuelProviders\FuelProviderDescriptor;
use Fleetbase\FleetOps\Support\FuelProviders\FuelProviderRegistry;
use Fleetbase\Providers\CoreServiceProvider;
use Vendor\FuelProvider\Support\AcmeFuelProvider;

class AcmeFuelProviderServiceProvider extends CoreServiceProvider
{
    public function register(): void
    {
        $this->callAfterResolving(FuelProviderRegistry::class, function (FuelProviderRegistry $registry) {
            if ($registry->has('acme_fuel')) {
                return;
            }

            $registry->register(new FuelProviderDescriptor([
                'key' => 'acme_fuel',
                'label' => 'Acme Fuel',
                'type' => 'extension',
                'category' => 'Integración de tarjetas de combustible',
                'icon' => 'gas-pump',
                'driver_class' => AcmeFuelProvider::class,
                'description' => 'Importa transacciones de tarjetas de combustible de Acme Fuel.',
                'docs_url' => 'https://example.com/docs',
                'required_fields' => [
                    [
                        'name' => 'api_key',
                        'label' => 'API Key',
                        'type' => 'password',
                        'required' => true,
                    ],
                ],
                'capabilities' => ['vehicles', 'transactions', 'stations'],
                'sync_defaults' => [
                    'window_days' => 7,
                    'matching_order' => ['provider_vehicle_id', 'internal_number', 'plate_number', 'vehicle_card_id'],
                    'auto_create_fuel_reports' => true,
                ],
                'setup_instructions' => [
                    'Crear o copiar una credencial de API de Acme Fuel.',
                    'Pegar la credencial en Fleet-Ops y probar la conexión.',
                    'Elegir la ventana de sincronización predeterminada y los identificadores de coincidencia.',
                ],
            ]));
        });
    }
}
```

Una vez que se ha instalado el paquete y se ha cargado su proveedor de servicios, el proveedor aparece en
**Fleet-Ops → Conectividad → Integraciones de combustible**
junto con PetroApp. No se requiere ninguna edición de la configuración del núcleo de Fleet-Ops cuando el descriptor se ajusta al esquema de configuración integrado.

## Contrato de adaptador

Los adaptadores de proveedores implementan
`Fleetbase\FleetOps\Contracts\FuelProvider`
. La mayoría de los adaptadores deben extender la clase de proveedor de combustible base de Fleet-Ops e implementar las llamadas a la API específicas del proveedor.

Métodos requeridos:

```
public function key(): string;
public function name(): string;
public function authenticate(FuelProviderConnection $connection): array;
public function testConnection(FuelProviderConnection $connection): array;
public function listVehicles(FuelProviderConnection $connection, array $options = []): Collection;
public function listTransactions(FuelProviderConnection $connection, Carbon $from, Carbon $to, array $options = []): Collection;
public function listStations(FuelProviderConnection $connection, array $options = []): Collection;
public function pushTrip(FuelProviderConnection $connection, array $trip): array;
public function syncVehicle(FuelProviderConnection $connection, array $vehicle): array;
public function webhookPayloadToTransaction(FuelProviderConnection $connection, array $payload): ?array;
```

Si un proveedor no admite el comportamiento opcional de retroalimentación, devuelva un array vacío o
`null`
para esos métodos.

## Normalización de transacciones

`listTransactions()`
debería devolver una colección de arrays normalizados. Fleet-Ops gestiona las operaciones de upsert, la coincidencia, la creación de informes de combustible vinculados y la importación de eventos después de que el adaptador haya devuelto payloads normalizados.

Campos importantes:

| Campo | Descripción |
|---|---|
| `provider` | Clave del proveedor, como `acme_fuel` |
| `provider_transaction_id` | ID de transacción estable del proveedor |
| `provider_vehicle_id` | Identidad del vehículo del proveedor cuando está disponible |
| `vehicle_card_id` | Identificador de tarjeta de combustible o vehículo |
| `internal_number` | Número interno del vehículo |
| `structure_number` | Número de estructura del proveedor o de la flota |
| `plate_number` | Número de matrícula del vehículo |
| `trip_number` | Referencia de viaje o pedido cuando está disponible |
| `station_name` | Nombre de la estación de combustible |
| `transaction_at` | Marca de tiempo de la transacción |
| `volume` | Volumen de combustible |
| `metric_unit` | Unidad, como `l` |
| `amount` | Cantidad de la transacción en unidades menores |
| `currency` | Código de moneda ISO |
| `odometer` | Lectura del odómetro cuando está disponible |
| `normalized_payload` | Metadatos normalizados específicos del proveedor |
| `raw_payload` | Respuesta original del proveedor |

Cuando un proveedor no expone un ID de transacción estable, genere un hash determinista de los campos de transacción inmutables para que las sincronizaciones repetidas actualicen la misma transacción de Fleet-Ops.

## Flujo de sincronización

1. Fleet-Ops sincroniza una conexión de proveedor por ventana de fecha.
2. El adaptador devuelve transacciones normalizadas.
3. Fleet-Ops realiza operaciones de upsert para cada
   `FuelProviderTransaction`
   .
4. Fleet-Ops intenta hacer coincidir la transacción con vehículos, pedidos y conductores.
5. Las transacciones coincidentes pueden crear registros de
   `FuelReport`
   vinculados.
6. Las transacciones no coincidentes permanecen en
   **Gestión → Transacciones de combustible**
   para la coincidencia manual, la revisión, el reprocesamiento o la ignoración.
7. Se disparan eventos para los resultados de importación, coincidencia, no coincidencia y creación de informes de combustible.

Utilice
`FuelProviderTransactionImported`
,
`FuelProviderTransactionMatched`
,
`FuelProviderTransactionUnmatched`
y
`FuelReportCreatedFromProvider`
si su extensión necesita agregar flujos de trabajo de revisión, conciliación o detección de fraude específicos del cliente.

## Flujo de trabajo del operador

1. Abra
   **Conectividad → Integraciones de combustible**
   .
2. Seleccione un proveedor, ingrese las credenciales, pruebe la conexión y guarde la configuración de sincronización.
3. Ejecute una sincronización manual o espere el intervalo de sincronización programado.
4. Revise las facturas de combustible importadas en
   **Gestión → Transacciones de combustible**
   .
5. Haga coincidir las transacciones con vehículos, pedidos o viajes cuando la coincidencia automática no puede resolverlas.
6. Utilice los
   **Fuel Reports**
   vinculados para operaciones, análisis y flujos de trabajo posteriores.

![Integraciones de combustible — sistemas de combustible conectados con su estado de sincronización y las integraciones disponibles para conectarse](https://fleetbase.io/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Ffleet-ops-fuel-integrations-list.ee661734.webp&w=3840&q=75&dpl=dpl_AzJHbqsc2PKAX3JJ9uiyfHMvrkww)