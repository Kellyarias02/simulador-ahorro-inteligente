# TODO - Consistencia de Botones con Tailwind

## Plan
Unificar estilos de botones:
- **Primario**: `bg-[#244672] hover:bg-[#1d385a] text-white font-semibold py-2 px-4 rounded-lg transition`
- **Secundario**: `border border-gray-300 hover:bg-gray-100 text-gray-700 font-medium py-2 px-4 rounded-lg transition`

## Cambios Realizados

### 1. SimulationResultModal.tsx
- [x] onConfirm: Cambiar `bg-green-600` → `bg-[#244672]`
- [x] onClose: Mejorar estilo secundario

### 2. SimulatorForm.tsx
- [x] Botón Simular: Cambiar `bg-blue-600` → `bg-[#244672]`

### 3. onboarding/page.tsx
- [x] Botón Enviar solicitud: Cambiar `bg-[#06d1f3]` → `bg-[#244672]`

## Verificación
- [x] ProductCard.tsx - Ya usa `#244672` ✓
- [x] HomeHero.tsx - Ya usa `#244672` ✓

