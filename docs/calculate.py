"""Perhitungan transparan untuk skenario konsep, bukan simulasi kinerja perangkat."""

import json
import math


def calculate():
    wave_flux = 0.49 * 1.0**2 * 6.0
    wave_electric = wave_flux * 4.0 * 0.50 * 0.35
    water_m3 = (200 * 20 + 5 * 100 + 5 * 50 + 250) / 1000
    loads = {
        "8_lampu_jalur_20W_12h": 8 * 20 * 12 / 1000,
        "5_lampu_kios_10W_6h": 5 * 10 * 6 / 1000,
        "kontrol_20W_24h": 20 * 24 / 1000,
        "pompa_distribusi_250W_2h": 250 * 2 / 1000,
        "pengisian_perangkat_100W_4h": 100 * 4 / 1000,
    }
    other_energy = sum(loads.values())
    sec = 5.0
    power_mean = 2.0  # Asumsi rata-rata 24 jam, BUKAN nameplate.
    net_factor = 0.90  # Allowance konversi/distribusi, bukan hasil ukur.
    net_energy = power_mean * 24 * net_factor
    ro_energy = water_m3 * sec
    critical_daily = loads["8_lampu_jalur_20W_12h"] + loads["kontrol_20W_24h"]
    battery_nominal = 8.0
    battery_deliverable = battery_nominal * 0.8 * 0.9
    cases = []
    for mean_kw in (2.0, 1.0, 0.5, 0.0):
        available = mean_kw * 24 * net_factor
        water_ceiling = max(0, available - other_energy) / sec
        cases.append({
            "mean_generation_kw": mean_kw,
            "net_energy_kwh_day": available,
            "water_energy_ceiling_m3_day": water_ceiling,
            "water_with_0_25m3_h_skid_ceiling": min(6.0, water_ceiling),
            "water_deficit_vs_target_m3_day": max(0, water_m3 - min(6.0, water_ceiling)),
            "electric_deficit_before_ro_kwh_day": max(0, other_energy - available),
        })
    return {
        "status": "assumptions_for_concept_not_measured_performance",
        "deepwater_wave_flux_kw_m": wave_flux,
        "illustrative_electric_output_kw": wave_electric,
        "Hs_for_12_4kw_if_other_assumptions_unchanged_m": math.sqrt(12.4 / wave_electric),
        "mean_generation_assumption_kw": power_mean,
        "water_target_m3_day": water_m3,
        "ro_sec_assumption_kwh_m3": sec,
        "other_loads_kwh_day": loads,
        "other_load_total_kwh_day": other_energy,
        "ro_kwh_day": ro_energy,
        "net_energy_kwh_day": net_energy,
        "load_total_kwh_day": ro_energy + other_energy,
        "unallocated_margin_kwh_day": net_energy - ro_energy - other_energy,
        "ro_skid_assumption_m3_h": 0.25,
        "ro_runtime_for_target_h_day": water_m3 / 0.25,
        "ro_operating_power_kw": 0.25 * sec,
        "battery_deliverable_kwh": battery_deliverable,
        "critical_load_kwh_day": critical_daily,
        "critical_load_autonomy_days_no_ro_no_distribution_pump": battery_deliverable / critical_daily,
        "water_reserve_usable_m3": water_m3 * 2,
        "recovery_assumption": 0.40,
        "feed_m3_day": water_m3 / 0.40,
        "brine_m3_day": water_m3 / 0.40 - water_m3,
        "SEC_sensitivity_target_load_total_kwh_day": {
            str(value): water_m3 * value + other_energy for value in (3.5, 5.0, 6.0)
        },
        "12_4kw_full_day_no_losses_all_ro_SEC3_5_m3_day": 12.4 * 24 / 3.5,
        "85m3_at_SEC5_required_mean_kw_with_other_loads_and_losses": (85 * 5 + other_energy) / (24 * net_factor),
        "sensitivity": cases,
    }


if __name__ == "__main__":
    print(json.dumps(calculate(), indent=2, ensure_ascii=False))
