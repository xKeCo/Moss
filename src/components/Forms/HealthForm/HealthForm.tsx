'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { createHealthInfo, navigate } from '@/actions';
import {
  FamilyBackgroundFields,
  HealthFormSchema,
  OralSystemReviewEnumFields,
  OralSystemReviewTextFields,
  PersonalBackgroundCheckboxFields,
  SystemReviewFields,
} from '@/lib/validations';
import {
  Button,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Checkbox,
  Badge,
  Textarea,
} from '@/components/ui';
import { Icons } from '@/components/Icons/Icons';

type HealthFormData = z.infer<typeof HealthFormSchema>;

export const HealthForm = ({
  isLoadingPage = false,
  cancelUrl,
  patientID,
}: {
  isLoadingPage?: boolean;
  cancelUrl: string;
  patientID: string;
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [allergies, setAllergies] = useState([]);
  const [medications, setMedications] = useState([]);
  const router = useRouter();

  const form = useForm<HealthFormData>({
    resolver: zodResolver(HealthFormSchema),
    defaultValues: {
      SystemReview: {
        head: '',
        neck: '',
        genitourinary: '',
        eyes: '',
        cardiovascular: '',
        locomotor: '',
        ORL: '',
        respiratory: '',
        skin: '',
        stomological: '',
        gastrointestinal: '',
        circulatory: '',
      },

      FamilyBackground: {
        diabetes: false,
        familyDiabetes: '',
        cancer: false,
        familyCancer: '',
        leukemia: false,
        familyLeukemia: '',
        heartDisease: false,
        familyHeartDisease: '',
        hypertension: false,
        familyHypertension: '',
        others: false,
        familyOthers: '',
      },

      PersonalBackground: {
        allergies: 'No hay alergias',
        medications: 'No hay medicamentos',
        habits: 'Saludables',
        habitsDescription: '',
        diabetes: false,
        cancer: false,
        leukemia: false,
        heartDisease: false,
        surgeries: false,
        surgeriesDescription: '',
        hospitalization: false,
        psychological: false,
        hypertension: false,
        others: false,
        othersDescription: '',
      },

      OralSystemReview: {
        teeth: 'Permanentes',
        teethColor: '',
        tongue: 'SinAlteraciones',
        ATMLeft: 'SinAlteraciones',
        ATMRight: 'SinAlteraciones',
        salivaryGlands: 'SinAlteraciones',
        occlusion: 'ClaseI',
        painThreshold: 'Normal',
        jointSounds: 'SinAlteraciones',
        faneras: '',
        oralCavity: '',
        maxMandibularOpening: '',
        leftLaterality: '',
        rightLaterality: '',
        protrusion: '',
      },
    },
  });

  async function onSubmit(values: HealthFormData) {
    setIsLoading(true);

    const healtInfo = await createHealthInfo(values, allergies, medications, patientID);

    setIsLoading(false);

    if (!healtInfo?.ok) {
      return toast.error(healtInfo?.errorMessage);
    }

    await navigate(cancelUrl);
    toast.success('Información guardada con éxito!');
    form.reset();
  }

  const cancelSubmit = () => {
    form.reset();
    router.push(cancelUrl);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="mt-6">
          <h1 className="font-semibold">Revisión por sistema</h1>
          <div className="h-[2px] bg-secondary mt-2"></div>
        </div>

        <div className="grid sm:grid-cols-4 gap-x-4 gap-y-5 mt-6">
          {SystemReviewFields.map((item: any) => (
            <FormField
              key={item.name}
              control={form.control}
              name={item.name}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{item.label}</FormLabel>
                  <FormControl>
                    <Input disabled={isLoadingPage} placeholder={item.placeholder} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          ))}
        </div>

        <div>
          <h1 className="font-semibold">Antecedentes medicos familiares</h1>
          <div className="h-[2px] bg-secondary mt-2"></div>
        </div>

        <div className="gap-4 grid sm:grid-cols-4">
          {FamilyBackgroundFields.map((item: any) => (
            <div className="flex flex-col gap-3" key={item.name}>
              <FormField
                control={form.control}
                name={item.name}
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center space-x-3 space-y-0 rounded-md">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                        id={item.name}
                        disabled={isLoadingPage}
                      />
                    </FormControl>
                    <FormLabel className="font-normal" htmlFor={item.name}>
                      {item.label}
                    </FormLabel>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name={item.inputName}
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        placeholder={`Familiar ${item.label}`}
                        disabled={isLoadingPage || !form.watch(item.name)}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          ))}
        </div>

        <div>
          <h1 className="font-semibold">Antecedentes medicos personales</h1>
          <div className="h-[2px] bg-secondary mt-2"></div>
        </div>

        <div className="gap-4 grid sm:grid-cols-4">
          <div className="flex flex-col items-start justify-start gap-4 col-span-2">
            <FormField
              control={form.control}
              name="PersonalBackground.allergies"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>
                    Alergias{' '}
                    <span className="text-xs text-muted-foreground">(Separado por comas)</span>
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Ej. Maní, Amoxicilina"
                      disabled={isLoadingPage}
                      onChange={(e) => {
                        field.onChange(e.target.value);
                        setAllergies(
                          e.target.value
                            .split(',')
                            .map((allergie) => allergie.trim())
                            .filter((n) => n) as any
                        );
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex items-start justify-start gap-1 flex-wrap">
              {allergies.length === 0 && <Badge className="capitalize">No hay alergias</Badge>}

              {allergies.map((allergie, index) => (
                <Badge key={`allergie_${allergie}_${index}`} className="capitalize">
                  {allergie}
                </Badge>
              ))}
            </div>
          </div>

          <div className="flex flex-col items-start justify-start gap-4 col-span-2">
            <FormField
              control={form.control}
              name="PersonalBackground.medications"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>
                    Medicamentos{' '}
                    <span className="text-xs text-muted-foreground">(Separado por comas)</span>
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Ej. Exelon, Razadyne, Aricept"
                      disabled={isLoadingPage}
                      onChange={(e) => {
                        field.onChange(e.target.value);
                        setMedications(
                          e.target.value
                            .split(',')
                            .map((allergie) => allergie.trim())
                            .filter((n) => n) as any
                        );
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex items-start justify-start gap-1 flex-wrap">
              {medications.length === 0 && (
                <Badge className="capitalize">No hay medicamentos</Badge>
              )}

              {medications.map((medication, index) => (
                <Badge key={`medication_${medication}_${index}`} className="capitalize">
                  {medication}
                </Badge>
              ))}
            </div>
          </div>

          {PersonalBackgroundCheckboxFields.map((item: any) => (
            <FormField
              key={item.name}
              control={form.control}
              name={item.name}
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md mt-2">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                      id={item.name}
                      disabled={isLoadingPage}
                    />
                  </FormControl>
                  <FormLabel className="font-normal" htmlFor={item.name}>
                    {item.label}
                  </FormLabel>
                </FormItem>
              )}
            />
          ))}

          <div></div>

          <div className="flex flex-col gap-3 mt-2">
            <FormField
              control={form.control}
              name="PersonalBackground.surgeries"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center space-x-3 space-y-0 rounded-md">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                      id="PersonalBackground.surgeries"
                      disabled={isLoadingPage}
                    />
                  </FormControl>
                  <FormLabel className="font-normal" htmlFor="PersonalBackground.surgeries">
                    Cirugías
                  </FormLabel>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="PersonalBackground.surgeriesDescription"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      placeholder="Ej. Cirugía de rodilla"
                      disabled={isLoadingPage || !form.watch('PersonalBackground.surgeries')}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="flex flex-col gap-3 mt-2">
            <FormField
              control={form.control}
              name="PersonalBackground.others"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center space-x-3 space-y-0 rounded-md">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                      id="PersonalBackground.others"
                      disabled={isLoadingPage}
                    />
                  </FormControl>
                  <FormLabel className="font-normal" htmlFor="PersonalBackground.others">
                    Otros
                  </FormLabel>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="PersonalBackground.othersDescription"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      placeholder="Ej. Otros antecedentes médicos personales"
                      disabled={isLoadingPage || !form.watch('PersonalBackground.others')}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="PersonalBackground.habits"
            render={({ field }) => (
              <FormItem className="mt-1">
                <FormLabel>Hábitos</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  disabled={isLoadingPage}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Seleccionar hábitos" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="Saludables">Saludables</SelectItem>
                    <SelectItem value="SuccionLingual">Succión lingual</SelectItem>
                    <SelectItem value="SuccionDigital">Succión digital</SelectItem>
                    <SelectItem value="Onicofagia">Onicofagia</SelectItem>
                    <SelectItem value="Bruxismo">Bruxismo</SelectItem>
                    <SelectItem value="Tabaco">Tabaco</SelectItem>
                    <SelectItem value="ModerObjetos">Moder objetos</SelectItem>
                    <SelectItem value="Otros">Otros</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="PersonalBackground.habitsDescription"
            render={({ field }) => (
              <FormItem className="mt-1">
                <FormLabel>Otros habitos</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Ej. otros hábitos"
                    disabled={isLoadingPage || form.watch('PersonalBackground.habits') !== 'Otros'}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div>
          <h1 className="font-semibold">
            Inspección por sistemas{' '}
            <span className="text-xs text-muted-foreground">
              (Solo se escribe lo más relevante. Ej. Anormalidades, tamaño, etc.)
            </span>
          </h1>
          <div className="h-[2px] bg-secondary mt-2"></div>
        </div>

        <div className="gap-4 grid sm:grid-cols-4">
          <FormField
            control={form.control}
            name="OralSystemReview.faneras"
            render={({ field }) => (
              <FormItem className="sm:col-span-2">
                <FormLabel>
                  Faneras <span className="text-xs text-muted-foreground">(Pelo, uñas, etc.)</span>
                </FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Ej. Uñas cortas, pelo largo"
                    disabled={isLoadingPage}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="OralSystemReview.teeth"
            render={({ field }) => (
              <FormItem className="mt-1">
                <FormLabel>Dientes</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  disabled={isLoadingPage}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Seleccionar hábitos" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="Temporales">Temporales</SelectItem>
                    <SelectItem value="Mixto">Mixto</SelectItem>
                    <SelectItem value="Permanentes">Permanentes</SelectItem>
                    <SelectItem value="EdentuloTotal">Edéntulo total</SelectItem>
                    <SelectItem value="EdentuloParcial">Edéntulo parcial</SelectItem>
                    <SelectItem value="Agenesias">Agenesias</SelectItem>
                    <SelectItem value="Anodoncia">Anodoncia</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="OralSystemReview.teethColor"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Color de dientes</FormLabel>
                <FormControl>
                  <Input placeholder="Ej. A1" disabled={isLoadingPage} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {OralSystemReviewEnumFields.map((item: any) => (
            <FormField
              key={item.name}
              control={form.control}
              name={item.name}
              render={({ field }) => (
                <FormItem className="mt-1">
                  <FormLabel>{item.label}</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    disabled={isLoadingPage}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder={item.placeholder} />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {item.options.map((option: { label: string; value: string }) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          ))}

          {OralSystemReviewTextFields.map((item: any) => (
            <FormField
              key={item.name}
              control={form.control}
              name={item.name}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{item.label}</FormLabel>
                  <FormControl>
                    <Input
                      placeholder={item.placeholder}
                      disabled={isLoadingPage}
                      {...field}
                      endDecorator={item.endDecorator && 'Milimetros'}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          ))}
        </div>

        <div className="flex items-center justify-start gap-4 pt-6">
          <Button type="button" variant="secondary" onClick={cancelSubmit} disabled={isLoading}>
            Cancelar
          </Button>
          <Button type="submit" disabled={isLoading}>
            Guardar Información
            {isLoading && <Icons.Spinner className="ml-2 h-4 w-4 animate-spin" />}
          </Button>
        </div>
      </form>
    </Form>
  );
};
