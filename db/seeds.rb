# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)


Generation.destroy_all
Genome.destroy_all

puts "Database Empty"

# gen1 = Generation.create average_fitness: '10'
# gen2 = Generation.create average_fitness: '11'
# gen3 = Generation.create average_fitness: '13'
#
# puts  "created #{Generation.all.length} Generations"
#
# Genome.create strand: "aabbabddcacdcabd", fitness: 5, generation_id: gen1.id;
# Genome.create strand: "abababdcdacdcabd", fitness: 11, generation_id: gen1.id;
# Genome.create strand: "aabbabddacdccabd", fitness: 10, generation_id: gen1.id;
#
# Genome.create strand: "bdcbacbacdadcbdc", fitness: 5, generation_id: gen2.id;
# Genome.create strand: "aabcdbadcadcacdb", fitness: 11, generation_id: gen2.id;
# Genome.create strand: "acbdadcacadcacdb", fitness: 17, generation_id: gen2.id;
#
# Genome.create strand: "acdbaaacddbdcbdb", fitness: 9, generation_id: gen3.id;
# Genome.create strand: "bcddcababcdbdcdc", fitness: 13, generation_id: gen3.id;
# Genome.create strand: "abcdbbbbdcdcaccc", fitness: 17, generation_id: gen3.id;
#
# puts  "created #{Genome.all.length} Genomes"
