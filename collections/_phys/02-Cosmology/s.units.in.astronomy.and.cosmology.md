---
category: Sheet
title: Commonly Used Units in Astronomy and Cosmology
tags: Cosmology
---


**A Fundamental SI / CGS base and derived**

| Domain       | Unit (name) | Symbol | SI conversion / definition                | Practical notes                                |
| ------------ | ----------- | ------ | ----------------------------------------- | ---------------------------------------------- |
| SI base      | metre       | m      | $$1,\mathrm{m}$$                          | Length (final reference for all distances)     |
| SI base      | kilogram    | kg     | $$1,\mathrm{kg}$$                         | Mass                                           |
| SI base      | second      | s      | $$1,\mathrm{s}$$                          | Time                                           |
| SI base      | kelvin      | K      | $$1,\mathrm{K}$$                          | Temperature (CMB, plasmas)                     |
| SI base      | ampere      | A      | $$1,\mathrm{A}$$                          | Instrumentation, plasma physics                |
| SI derived   | radian      | rad    | dimensionless                             | Natural angular unit                           |
| SI derived   | steradian   | sr     | dimensionless                             | Solid angle                                    |
| SI derived   | hertz       | Hz     | $$1,\mathrm{Hz}=1,\mathrm{s^{-1}}$$       | Frequency                                      |
| SI derived   | joule       | J      | $$1,\mathrm{J}=1,\mathrm{kg,m^2,s^{-2}}$$ | Energy                                         |
| SI derived   | watt        | W      | $$1,\mathrm{W}=1,\mathrm{J,s^{-1}}$$      | Power, luminosity                              |
| SI derived   | newton      | N      | $$1,\mathrm{N}=1,\mathrm{kg,m,s^{-2}}$$   | Force (rarely used directly)                   |
| SI derived   | pascal      | Pa     | $$1,\mathrm{Pa}=1,\mathrm{N,m^{-2}}$$     | Pressure (ISM/ICM sometimes)                   |
| CGS base     | centimetre  | cm     | $$1,\mathrm{cm}=10^{-2},\mathrm{m}$$      | Legacy astro convention                        |
| CGS base     | gram        | g      | $$1,\mathrm{g}=10^{-3},\mathrm{kg}$$      | Legacy astro convention                        |
| CGS derived  | erg         | erg    | $$1,\mathrm{erg}=10^{-7},\mathrm{J}$$     | Common for energies, luminosities              |
| CGS derived  | dyne        | dyn    | $$1,\mathrm{dyn}=10^{-5},\mathrm{N}$$     | Common in older stellar structure texts        |
| CGS pressure | barye       | Ba     | $$1,\mathrm{Ba}=0.1,\mathrm{Pa}$$         | Since $$1,\mathrm{Ba}=1,\mathrm{dyn,cm^{-2}}$$ |

SI definitions are set by fixed constants in the SI Brochure. 


**Angles, sky coordinates, areas on the sky**

| Domain     | Unit (name)    | Symbol    | SI conversion / definition                    | Practical notes                                             |
| ---------- | -------------- | --------- | --------------------------------------------- | ----------------------------------------------------------- |
| Angle      | degree         | °         | $$1^\circ=\pi/180,\mathrm{rad}$$              | Sky maps, FoV                                               |
| Angle      | arcminute      | arcmin, ′ | $$1′=1/60^\circ$$                             | Seeing/FoV                                                  |
| Angle      | arcsecond      | arcsec, ″ | $$1″=\pi/648000,\mathrm{rad}$$                | Astrometry, PSF FWHM, pixel scale                           |
| Angle      | milliarcsecond | mas       | $$1,\mathrm{mas}=10^{-3},\mathrm{arcsec}$$    | Gaia-level astrometry                                       |
| Angle      | microarcsecond | μas       | $$1,\mathrm{\mu as}=10^{-6},\mathrm{arcsec}$$ | Precision lensing/astrometry                                |
| RA measure | hour (of RA)   | h         | $$1,\mathrm{h_{RA}}=15^\circ$$                | Right ascension is often in h:m:s                           |
| RA measure | minute (of RA) | m         | $$1,\mathrm{m_{RA}}=15′$$                     | Coordinate formatting                                       |
| RA measure | second (of RA) | s         | $$1,\mathrm{s_{RA}}=15″$$                     | Coordinate formatting                                       |
| Sky area   | square degree  | deg²      | $$1,\mathrm{deg^2}=(\pi/180)^2,\mathrm{sr}$$  | Survey areas                                                |
| Sky area   | steradian      | sr        | SI solid angle                                | All-sky is $$4\pi,\mathrm{sr}\approx 41253,\mathrm{deg^2}$$ |

**Time**

| Domain     | Unit (name)        | Symbol      | SI conversion / definition                             | Practical notes                  |
| ---------- | ------------------ | ----------- | ------------------------------------------------------ | -------------------------------- |
| Time       | minute             | min         | $$60,\mathrm{s}$$                                      | Exposure times                   |
| Time       | hour               | h           | $$3600,\mathrm{s}$$                                    | Observing blocks                 |
| Time       | day                | d           | $$86400,\mathrm{s}$$                                   | Cadence/periods                  |
| Time       | year (Julian year) | a (or yr)   | $$1,\mathrm{a}=365.25,\mathrm{d}=31557600,\mathrm{s}$$ | Useful for light-year conversion |
| Time scale | kiloyear           | kyr (or ka) | $$10^3,\mathrm{a}$$                                    | Astro/geo timescales             |
| Time scale | megayear           | Myr (or Ma) | $$10^6,\mathrm{a}$$                                    | Stellar/galaxy evolution         |
| Time scale | gigayear           | Gyr (or Ga) | $$10^9,\mathrm{a}$$                                    | Cosmology                        |


**Distances**

| Domain           | Unit (name)       | Symbol                  | SI conversion / definition                                                    | Practical notes                       |
| ---------------- | ----------------- | ----------------------- | ----------------------------------------------------------------------------- | ------------------------------------- |
| Solar system     | astronomical unit | au                      | $$1,\mathrm{au}=149,597,870,700,\mathrm{m}$$ (exact)                          | IAU-defined; prefer “au”              |
| Stellar          | parsec            | pc                      | $$1,\mathrm{pc}=\frac{648000}{\pi},\mathrm{au}$$ (exact, via IAU framework)   | Parallax geometry; standard in papers |
| Stellar/galactic | kiloparsec        | kpc                     | $$10^3,\mathrm{pc}$$                                                          | Milky Way structure                   |
| Extragalactic    | megaparsec        | Mpc                     | $$10^6,\mathrm{pc}$$                                                          | LSS, distances, Hubble law            |
| Cosmology        | gigaparsec        | Gpc                     | $$10^9,\mathrm{pc}$$                                                          | Horizon-scale distances               |
| Popular          | light-year        | ly                      | $$1,\mathrm{ly}=c\times 1,\mathrm{a}\approx 9.4607\times 10^{15},\mathrm{m}$$ | Teaching; less common in research     |
| LSS convention   | “per h” distance  | $$h^{-1},\mathrm{Mpc}$$ | $$= \mathrm{Mpc}/h$$                                                          | Makes $$H_0$$ dependence explicit     |

**Mass, gravity, and “nominal” solar/planet units**

| Domain          | Unit (name)                         | Symbol                                 | SI conversion / definition                                      | Practical notes                            |
| --------------- | ----------------------------------- | -------------------------------------- | --------------------------------------------------------------- | ------------------------------------------ |
| Mass (physical) | solar mass (measured)               | $$M_\odot$$                            | $$\approx 1.988\times 10^{30},\mathrm{kg}$$ (measured)          | The *value can update* with best estimates |
| Nominal (exact) | nominal solar radius                | $$R_\odot^{\mathrm{N}}$$               | $$6.957\times 10^8,\mathrm{m}$$ (exact nominal)                 | Use as conversion constant                 |
| Nominal (exact) | nominal solar luminosity            | $$L_\odot^{\mathrm{N}}$$               | $$3.828\times 10^{26},\mathrm{W}$$ (exact nominal)              | Standard luminosity unit                   |
| Nominal (exact) | nominal solar effective temperature | $$T_{\mathrm{eff}\odot}^{\mathrm{N}}$$ | $$5772,\mathrm{K}$$ (exact nominal)                             | Stellar scaling                            |
| Nominal (exact) | nominal solar mass parameter        | $$(GM)_\odot^{\mathrm{N}}$$            | $$1.3271244\times 10^{20},\mathrm{m^3,s^{-2}}$$ (exact nominal) | Orbital dynamics prefers $$GM$$            |
| Nominal (exact) | nominal Earth mass parameter        | $$(GM)_\oplus^{\mathrm{N}}$$           | $$3.986004\times 10^{14},\mathrm{m^3,s^{-2}}$$ (exact nominal)  | Exoplanets, orbits                         |
| Nominal (exact) | nominal Jupiter mass parameter      | $$(GM)_J^{\mathrm{N}}$$                | $$1.2668653\times 10^{17},\mathrm{m^3,s^{-2}}$$ (exact nominal) | Exoplanets, RV masses                      |

Key point: IAU “nominal” quantities are **exact by definition** (conversion factors), not “latest measured” values. 


**Energy, particle units, spectroscopy essentials**

| Domain              | Unit (name)           | Symbol | SI conversion / definition                              | Practical notes                                            |
| ------------------- | --------------------- | ------ | ------------------------------------------------------- | ---------------------------------------------------------- |
| Energy              | electron-volt         | eV     | $$1,\mathrm{eV}=1.602176634\times 10^{-19},\mathrm{J}$$ | X/γ-ray astronomy, atomic lines                            |
| Energy              | keV / MeV / GeV / TeV | keV…   | $$10^3,10^6,10^9,10^{12},\mathrm{eV}$$                  | High-energy bands                                          |
| Wavelength          | ångström              | Å      | $$1,\unicode{x212B}=10^{-10},\mathrm{m}$$               | Optical/UV spectra                                         |
| Wavelength          | nanometre             | nm     | $$10^{-9},\mathrm{m}$$                                  | Optical/UV                                                 |
| Wavelength          | micrometre            | μm     | $$10^{-6},\mathrm{m}$$                                  | IR                                                         |
| Wavenumber          | inverse centimetre    | cm⁻¹   | $$1,\mathrm{cm^{-1}}=100,\mathrm{m^{-1}}$$              | Molecular/IR spectroscopy                                  |
| Spectral resolution | resolving power       | $$R$$  | $$R=\lambda/\Delta\lambda$$ (dimensionless)             | Instrument performance spec                                |
| Line strength       | equivalent width      | EW     | usually Å or nm                                         | $$\mathrm{EW}=\int (1-F_\lambda/F_{\lambda,c}),d\lambda$$  |
| Velocity            | km/s                  | km/s   | $$1,\mathrm{km,s^{-1}}=10^3,\mathrm{m,s^{-1}}$$         | RVs, dispersions, outflows                                 |
| Redshift            | redshift              | $$z$$  | dimensionless                                           | For small $$z$$, $$v\approx cz$$ (not valid at high $$z$$) |


**Radiometry / photometry**

| Domain                      | Unit (name)       | Symbol        | SI conversion / definition                                       | Practical notes                      |
| --------------------------- | ----------------- | ------------- | ---------------------------------------------------------------- | ------------------------------------ |
| Flux                        | irradiance / flux | $$F$$         | $$\mathrm{W,m^{-2}}$$                                            | Broadband energy flux at detector    |
| Flux (cgs)                  | flux              |               | $$1,\mathrm{erg,s^{-1},cm^{-2}}=10^{-3},\mathrm{W,m^{-2}}$$      | Still very common in high-energy     |
| Spectral flux density       | per frequency     | $$f_\nu$$     | $$\mathrm{W,m^{-2},Hz^{-1}}$$                                    | Radio/SEDs; connects to AB mags      |
| Spectral flux density (cgs) | per frequency     | $$f_\nu$$     | $$\mathrm{erg,s^{-1},cm^{-2},Hz^{-1}}$$                          | AB definition often written in cgs   |
| Spectral flux density       | per wavelength    | $$f_\lambda$$ | $$\mathrm{W,m^{-2},m^{-1}}$$ (often per μm or Å)                 | Spectrophotometry                    |
| Specific intensity          | per freq per sr   | $$I_\nu$$     | $$\mathrm{W,m^{-2},Hz^{-1},sr^{-1}}$$                            | Surface brightness in physical units |
| Radiance (photon)           | photon radiance   |               | $$\mathrm{photons,s^{-1},m^{-2},sr^{-1}}$$ (optionally per Å/μm) | Airglow/aurora, IFU work             |
| Luminosity                  | power output      | $$L$$         | $$\mathrm{W}$$ (or erg/s)                                        | Intrinsic source power               |
| Emissivity                  | volume emissivity | $$j_\nu$$     | $$\mathrm{W,m^{-3},Hz^{-1},sr^{-1}}$$                            | Radiative transfer                   |
| Absorption                  | opacity           | $$\kappa$$    | $$\mathrm{m^2,kg^{-1}}$$ (or $$\mathrm{cm^2,g^{-1}}$$)           | Dust/ISM; model-dependent            |


**Radio / IR community standards**

| Domain             | Unit (name)       | Symbol   | SI conversion / definition                                             | Practical notes               |
| ------------------ | ----------------- | -------- | ---------------------------------------------------------------------- | ----------------------------- |
| Radio flux density | jansky            | Jy       | $$1,\mathrm{Jy}=10^{-26},\mathrm{W,m^{-2},Hz^{-1}}$$                   | Default radio continuum unit  |
| Flux density       | mJy / μJy         | mJy, μJy | $$10^{-3},10^{-6},\mathrm{Jy}$$                                        | Deep fields                   |
| Surface brightness | megajansky per sr | MJy/sr   | $$10^6,\mathrm{Jy,sr^{-1}}$$                                           | IR sky maps, diffuse emission |
| Solar radio        | solar flux unit   | SFU      | $$1,\mathrm{SFU}=10^4,\mathrm{Jy}=10^{-22},\mathrm{W,m^{-2},Hz^{-1}}$$ | Solar radio bursts            |


**Magnitudes and common photometric systems**

| Domain                | Unit (name)           | Symbol              | SI conversion / definition                                | Practical notes                                  |
| --------------------- | --------------------- | ------------------- | --------------------------------------------------------- | ------------------------------------------------ |
| Log brightness        | magnitude             | mag                 | logarithmic                                               | $$m_1-m_2=-2.5\log_{10}(F_1/F_2)$$               |
| System                | AB magnitude          | $$m_{\mathrm{AB}}$$ | $$m_{\mathrm{AB}}=-2.5\log_{10}(f_\nu/3631,\mathrm{Jy})$$ | Most survey photometry                           |
| System                | Vega magnitude        |                     | defined relative to Vega SED                              | Filter-dependent zero points; still common in IR |
| System                | ST magnitude          | $$m_{\mathrm{ST}}$$ | defined for constant $$f_\lambda$$ zero point             | Often in HST contexts                            |
| Distance indicator    | distance modulus      | $$\mu$$             | $$\mu=m-M=5\log_{10}(d/10,\mathrm{pc})$$                  | Photometric distances                            |
| Surface brightness    | mag per arcsec²       | mag/arcsec²         | logarithmic per solid angle                               | Imaging papers; must specify band + system       |
| Bolometric mags (IAU) | zero-point luminosity | $$L_0$$             | $$L_0=3.0128\times 10^{28},\mathrm{W}$$                   | For $$M_{\mathrm{bol}}=0$$                       |
| Bolometric mags (IAU) | zero-point irradiance | $$f_0$$             | $$f_0=2.518021002\times 10^{-8},\mathrm{W,m^{-2}}$$       | For $$m_{\mathrm{bol}}=0$$                       |


**Atmosphere / observing conditions**

| Domain     | Unit (name)     | Symbol      | SI conversion / definition                | Practical notes                                                     |
| ---------- | --------------- | ----------- | ----------------------------------------- | ------------------------------------------------------------------- |
| Geometry   | airmass         | $$X$$       | dimensionless, approx $$X\approx \sec z$$ | Used in extinction correction; more accurate formula at large $$z$$ |
| Extinction | mag per airmass | mag/airmass | logarithmic                               | Instrument/site dependent; measured from standards                  |
| Seeing     | PSF FWHM        | arcsec      | angle units                               | Often reported as FWHM in arcsec (or pixels)                        |

**Detector & pipeline units**

These are ubiquitous in data reduction but are **instrument-defined**. Conversions require calibration metadata (gain, QE, exposure time, flat-field, etc.).

| Domain           | Unit (name)            | Symbol                | SI conversion / definition                                                           | Practical notes                                                      |
| ---------------- | ---------------------- | --------------------- | ------------------------------------------------------------------------------------ | -------------------------------------------------------------------- |
| CCD/CMOS         | electron count         | $$e^-$$               | physical charge: $$1,e^- \Rightarrow 1.602176634\times 10^{-19},\mathrm{C}$$         | Fundamental “charge carrier” for photon detection                    |
| CCD/CMOS         | photon                 | photon                | energy $$E=h\nu$$                                                                    | Connects radiometry to counting stats                                |
| Imaging          | digital number / ADU   | DN, ADU               | dimensionless (digitized)                                                            | Raw images; need gain to convert to $$e^-$$                          |
| Imaging          | count (generic)        | count                 | dimensionless                                                                        | Often used interchangeably with DN/ADU in logs; clarify definition   |
| Calibration      | gain                   | $$g$$                 | $$g=\frac{e^-}{\mathrm{ADU}}$$                                                       | Converts digitized signal to electrons                               |
| Noise            | read noise             | RN                    | usually $$e^-$$ (or ADU)                                                             | Per read; dominated at short exposures                               |
| Noise            | dark current           |                       | $$e^-,\mathrm{pix^{-1},s^{-1}}$$                                                     | Thermal electrons; scales with temperature                           |
| Detector         | full well capacity     |                       | $$e^-,\mathrm{pix^{-1}}$$                                                            | Saturation threshold in electrons                                    |
| Detector         | bias level             |                       | ADU                                                                                  | Additive offset; removed in calibration                              |
| Detector         | flat-field             |                       | dimensionless                                                                        | Pixel response correction (relative sensitivity)                     |
| Detector         | quantum efficiency     | QE                    | dimensionless (0–1)                                                                  | Fraction of photons producing electrons                              |
| Sampling         | pixel                  | pix                   | dimensionless                                                                        | Indexing; must state pixel scale                                     |
| Plate scale      | angular per pixel      | arcsec/pix            | angle / pixel                                                                        | Converts detector coordinates to sky angles                          |
| Spectroscopy     | dispersion             | Å/pix (or nm/pix)     | wavelength per pixel                                                                 | Wavelength solution product                                          |
| Spectroscopy     | line spread FWHM       | pix or Å              | instrument-dependent                                                                 | Spectral PSF; relates to resolution                                  |
| Photometry       | instrumental magnitude | $$m_{\mathrm{inst}}$$ | $$m_{\mathrm{inst}}=-2.5\log_{10}(\mathrm{counts}/t_{\mathrm{exp}})+\mathrm{const}$$ | Converted to calibrated mags via zeropoint + extinction + color term |
| Zeropoint        | photometric zeropoint  | ZP                    | mag                                                                                  | Magnitude corresponding to 1 count/s (convention)                    |
| Exposure         | exposure time          | $$t_{\mathrm{exp}}$$  | s                                                                                    | Needed for converting counts to count-rate                           |
| SNR              | signal-to-noise        | SNR                   | dimensionless                                                                        | Often per pixel, per resolution element, or per aperture             |
| SDSS linear flux | nanomaggy              | nMgy                  | $$\approx 3.631\times 10^{-6},\mathrm{Jy}$$                                          | Linear flux unit in SDSS products                                    |


**Cosmology-specific**

| Domain            | Unit (name)           | Symbol                          | SI conversion / definition                                                      | Practical notes                                                      |
| ----------------- | --------------------- | ------------------------------- | ------------------------------------------------------------------------------- | -------------------------------------------------------------------- |
| Expansion rate    | Hubble constant units | $$\mathrm{km,s^{-1},Mpc^{-1}}$$ | $$1,\mathrm{km,s^{-1},Mpc^{-1}}\approx 3.24078\times 10^{-20},\mathrm{s^{-1}}$$ | Standard reporting for $$H_0$$                                       |
| Parameter         | reduced Hubble        | $$h$$                           | $$h=H_0/(100,\mathrm{km,s^{-1},Mpc^{-1}})$$                                     | Used in $$h^{-1},\mathrm{Mpc}$$, $$h,\mathrm{Mpc^{-1}}$$             |
| Wavenumber        | comoving wavenumber   | $$k$$                           | often $$h,\mathrm{Mpc^{-1}}$$                                                   | LSS power spectra                                                    |
| Power spectrum    | 3D matter power       | $$P(k)$$                        | often $$(\mathrm{Mpc}/h)^3$$                                                    | Depends on Fourier convention                                        |
| Density           | critical density      | $$\rho_c$$                      | $$\rho_c=3H^2/(8\pi G)$$                                                        | Expressed in $$\mathrm{kg,m^{-3}}$$ or $$M_\odot,\mathrm{Mpc^{-3}}$$ |
| Density parameter | Omega                 | $$\Omega_i$$                    | dimensionless                                                                   | Fraction of critical density                                         |
| Fluctuation amp.  | sigma-eight           | $$\sigma_8$$                    | dimensionless                                                                   | RMS in spheres of $$8,h^{-1},\mathrm{Mpc}$$                          |

**Key References**

* SI unit definitions (BIPM SI Brochure). ([BIPM][1])
* IAU 2012 definition of the astronomical unit (au). ([syrte.obspm.fr][2])
* IAU 2015 nominal solar/planet conversion constants (Resolution B3). ([arXiv][4])
* AB magnitude and the 3631 Jy zero point (practical survey definition). ([sdss4.org][7])
* IAU 2015 bolometric magnitude zero points (Resolution B2). ([arXiv][3])


[1]: https://www.bipm.org/documents/20126/41483022/SI-Brochure-9-EN.pdf?utm_source=chatgpt.com "SI Brochure - 9th ed./version 3.02"
[2]: https://syrte.obspm.fr/IAU_resolutions/Res_IAU2012_B2.pdf?utm_source=chatgpt.com "RESOLUTION B2"
[3]: https://arxiv.org/abs/1510.06262?utm_source=chatgpt.com "IAU 2015 Resolution B2 on Recommended Zero Points for the Absolute and Apparent Bolometric Magnitude Scales"
[4]: https://arxiv.org/abs/1510.07674?utm_source=chatgpt.com "IAU 2015 Resolution B3 on Recommended Nominal Conversion Constants for Selected Solar and Planetary Properties"
[5]: https://www.nationalacademies.org/read/11719/chapter/4?utm_source=chatgpt.com "Chapter: 2 The Scientific Background"
[6]: https://pmc.ncbi.nlm.nih.gov/articles/PMC12213921/?utm_source=chatgpt.com "Noise in Maps of the Sun at Radio Wavelengths I - PMC - NIH"
[7]: https://www.sdss4.org/dr12/algorithms/fluxcal/?utm_source=chatgpt.com "Flux Calibration"
[8]: https://www.sdss3.org/dr10/algorithms/magnitudes.php?utm_source=chatgpt.com "Measures Of Flux And Magnitude"
