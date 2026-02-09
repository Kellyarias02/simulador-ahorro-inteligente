# Simulador del Ahorro Digital

Aplicación web construida con **Next.js 14+** que permite descubrir productos financieros, simular rentabilidades y registrar intenciones de apertura.

## Características

### 1. Descubrimiento de Productos Financieros (`/products`)
- Listado de cuentas de ahorro (datos simulados en JSON local)
- **Filtros en tiempo real** con debounce (500ms)
- **ISR** (Incremental Static Regeneration) con revalidación cada 60 segundos

### 2. Simulador de Rentabilidad (`/simulator`)
- Formulario con monto inicial, aporte mensual y plazo
- **Cálculo de interés compuesto** mensual
- Validaciones en tiempo real
- Formato de moneda (COP)
- Modal con resultado de simulación

### 3. Registro de Intención de Apertura (`/onboarding`)
- Formulario con validación de campos
- **reCAPTCHA simulado** (token = "OK")
- Generación de UUID para código de solicitud
- Visualización de resumen de simulación previa

## 🏗️ Arquitectura

```
app/
├── components/          # Componentes compartidos
│   └── HomeHero.tsx    # Hero de la página principal
├── onboarding/
│   ├── page.tsx        # Página de registro (Client)
│   └── components/
│       └── OnboardingForm.tsx
├── products/
│   ├── page.tsx        # Listado con ISR
│   ├── types.ts        # Tipos TypeScript
│   └── components/
│       ├── ProductCard.tsx      # Card de producto (Server)
│       ├── ProductClient.tsx    # Filtros (Client)
│       ├── ProductFilters.tsx   # Input búsqueda (Client)
│       ├── ProductGrid.tsx      # Grid (Server)
│       └── ProductHero.tsx      # Hero productos
├── simulator/
│   ├── page.tsx        # Página simulador (Client)
│   └── components/
│       ├── SimulatorForm.tsx           # Formulario (Client)
│       └── SimulationResultModal.tsx   # Modal resultado
└── layout.tsx          # Layout raíz (Server)
```

## 📊 Server vs Client Components

### Server Components (Renderizado en Servidor)
- `app/layout.tsx` - Layout principal
- `app/page.tsx` - Página de inicio
- `app/products/page.tsx` - Listado con ISR
- `app/components/HomeHero.tsx` - Hero estático
- `app/products/components/ProductCard.tsx` - Card sin interactividad
- `app/products/components/ProductGrid.tsx` - Renderizado de lista
- `app/products/components/ProductHero.tsx` - Hero estático
- `app/products/components/EmptyState.tsx` - Estado vacío

### Client Components (Interactividad en Navegador)
- `app/simulator/page.tsx` - Necesita useState, Suspense
- `app/simulator/components/SimulatorForm.tsx` - useState, useSearchParams
- `app/simulator/components/SimulationResultModal.tsx` - Props y estados
- `app/onboarding/page.tsx` - useState, useSearchParams
- `app/products/components/ProductClient.tsx` - useState para filtros
- `app/products/components/ProductFilters.tsx` - useState, useEffect (debounce)

##  ISR vs SSR

### Decisión: ISR (`revalidate = 60`)

**¿Por qué ISR en `/products`?**

Para la página de productos, decidí usar Incremental Static Regeneration (ISR) en lugar de SSR por las siguientes razones:

Los productos financieros no cambian constantemente, por lo que no es necesario generar la página en cada solicitud.

ISR permite entregar HTML pre-renderizado, lo que hace que la página cargue mucho más rápido para el usuario.

Al regenerar la página cada cierto tiempo (por ejemplo, cada 60 segundos), se reduce la carga en el servidor y las consultas frecuentes a la base de datos.

Este intervalo de actualización es aceptable para productos que no requieren datos en tiempo real, equilibrando eficiencia y frescura de la información.

En resumen: ISR combina velocidad, eficiencia y datos suficientemente actualizados para este caso.

## 🧮 Fórmula de Interés Compuesto

```
Tasa mensual = Tasa anual / 100 / 12

Para cada mes:
Monto_final = (Monto_anterior + Aporte_mensual) * (1 + Tasa_mensual)
```

**Ejemplo:**
- Monto inicial: $1,000,000
- Aporte mensual: $100,000
- Plazo: 12 meses
- Tasa anual: 10%

```
Mes 1: (1,000,000 + 100,000) * (1 + 0.10/12) = $1,109,166
Mes 12: Resultado final con intereses compuestos
```

## 🚀 Instalación

```bash
# Clonar el repositorio
git clone https://github.com/Kellyarias02/simulador-ahorro-inteligente.git

# Entrar en la carpeta del proyecto
cd simulador-ahorro-inteligente

# Instalar dependencias
npm install

# Levantar el proyecto en modo desarrollo
npm run dev

# Build de producción
npm run build

# Iniciar producción
npm start
```

## 🛠️ Tecnologías

- **Next.js 14+** - Framework React con App Router
- **TypeScript** - Tipado estático
- **Tailwind CSS** - Estilos utilitarios
- **React** - Librería UI
- **Lucide React** - Iconos

## 📁 Estructura de Datos

```typescript
interface Product {
  id: string;
  name: string;
  type: 'programado' | 'flexible' | 'joven' | 'premium';
  description: string;
  interestRate: number; // Porcentaje EA
  minAmount: number;
  image: string;
}
```

##  Diseño de Botones

### Botones Primarios (CTAs - Simular/Conocer más)
```css
bg-[#244672] hover:bg-[#1d385a]
```

### Botones de Acción (Abrir Cuenta)
```css
bg-[#08a8c5] hover:bg-[#0799b0] t
```


## Licencia

Este proyecto fue desarrollado como parte de un desafío técnico.

## Mejoras futuras

Microservicio Backend (NestJS):
Actualmente los productos se obtienen desde un JSON local (products.json).
En una versión futura, se planea reemplazarlo por un microservicio que provea los productos dinámicamente, permitiendo:

Escalabilidad y actualización en tiempo real de tasas de interés y productos.

Integración con bases de datos y APIs externas.

Consumo desde el frontend vía fetch.

Esta decisión fue intencional: se priorizó que la funcionalidad principal del simulador, las validaciones y la experiencia de usuario estuvieran completas. La integración con un backend dinámico es un próximo paso estratégico, mostrando capacidad de escalabilidad y visión de arquitectura.