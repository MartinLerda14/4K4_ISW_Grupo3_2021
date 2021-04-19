## Estructura del Repositorio

```
4K4_ISW_Grupo3_2021
|─── General
|	|─── Protocolos
|	|─── Material de soporte para parciales
|	|─── Bibliografía
|─── Teórico
|	|─── Presentaciones
|	|─── Trabajos conceptuales
|	| |─── Póster científico
|	| |─── Mapa Mental
|	| |─── Pecha Kucha
|─── Práctico
|	|─── Evaluable
|	|	|─── Práctico 1
|	|	|─── Práctico 4
|	|	|─── Práctico 5
|	|	|─── Práctico 6
|	|	|	|─── Fuente
|	|	|─── Práctico 7
|	|	|─── Práctico 8
|	|	|─── Práctico 12
|	|	|─── Práctico 13
|	|	|─── Práctico 14
|	|─── No evaluable
|	|─── Práctico 2
|	|─── Práctico 3
|	|─── Práctico 9
|	|─── Práctico 10
|	|─── Práctico 11
```
## Listado de Items de Configuración

| Nombre del Ítem | Regla de nombrado | Ubicación física | 
| --- | --- | --- |
Plan de Administración de Configuración | Plan de Administración de Configuración	ISW_G3_PlanSCM.pdf	| /
Modalidad Académica | ISW_ModalidadAcademica_<yyyy>.pdf | /
Protocolos para rendir | ISW_ProtocoloExamen_<tipo_examen>.pdf | /General/Protocolos/
Templates	para	rendir parciales prácticos | ISW_TemplateParcialPráctico_<número>.docx | /General/Material de soporte para parciales/
Material de soporte para parciales teóricos | ISW_SoporteParcialesTeóricos.pdf | /General/Material de soporte para parciales/
Libros de Bibliografía | ISW_Bibliografía_<nombre>.pdf | /General/Bibliografia/
Presentaciones clases teóricas | ISW_Teorico_Clase<Nro_clase>_<nombre>.pdf | /Teorico/Presentaciones/
Trabajo conceptual póster científico | ISW_G3_TC_PÓSTER_<nombre>.pdf | /Teorico/Trabajos Conceptuales/Poster Cientifico/
Trabajo conceptual Mapa Mental | ISW_G3_TC_MapaMental_<nombre>. <extensión> | /Teorico/Trabajos Conceptuales/Mapa Mental/
Trabajo	conceptual exposición	oral (pechakucha) | ISW_G3_TC_PECHAKUCHA_<nombre>.pptx | /Teorico/Trabajos Conceptuales/Pecha Kucha/
Guia ejercicios prácticos | ISW_Guía_EjerciciosPrácticos_<res>.pdf | -
Trabajo práctico | ISW_G3_TP_<eval>_<numero>_<nombre>.pdf | /Practico
Línea base del repositorio | - | /
Componente de Software (código	fuente, ejecutables, librerías comunes) | ISW_G3_<nombre>.<extensión> | -
 
 ## Glosario

| Sigla | Significado | 
| --- | --- |
\<yyyy> | Año lectivo |
\<tipo_examen> | Examen parcial o final |
\<número> | Número cardinal, inicia en 01
\<nombre> | Nombre identificatorio del item. Ej.: “Roles y Ciclo de Vida”, “User Stories Applied”
\<tipo_clase> | Teórica o práctica
\<res> | Resueltos o enunciados
\<eval> |	Evaluable o No evaluable
\<nombre_L_B> |	Nombre identificatorio de la línea base
\<extensión> |	Nombre de la extensión del archivo definido como ítem

## Gestión de la línea base
Cada línea base del SCM será creada durante el día posterior a la fecha de cada uno de los exámenes parciales de la cátedra. En la misma, estarán incluidos todos los archivos de la rama o branch “master” del repositorio cuyo commit se haya producido hasta las 23:59 del día anterior al parcial.
Esta línea base será almacenada en forma de release dentro de la ruta https://github.com/MartinLerda14/4K4_ISW_Grupo3_2021/releases/, tal como fue definido en el listado de items de configuración
